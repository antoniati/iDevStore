"use server";

import * as z from "zod";
import { db } from "@/libs/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/libs/mail";
import { getUserByEmail } from "@/actions/read/get-users";
import { generateTwoFactorToken, generateVerificationToken, } from "@/actions/create/generate-tokens";
import { getTwoFactorTokenByEmail } from "@/actions/read/get-tokens";
import { getTwoFactorConfirmationByUserId } from "@/actions/read/get-two-factor";

export const loginSession = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
      const validatedFields = LoginSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or non-existent fields. Please enter valid fields." };

      const { email, password, code, } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email || !existingUser.password) return { error: "Invalid or non-existent data. Please enter valid data." };

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email)

            await sendVerificationEmail(verificationToken.email, verificationToken.token);

            return { success: "An account verification email has been sent. Please check your inbox to complete your registration." }
      };

      if (existingUser.isTwoFactorEnabled && existingUser.email) {
            if (code) {
                  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

                  if (!twoFactorToken) return { error: "Nonexistent code" };

                  if (twoFactorToken.token !== code) return { error: "Invalid Code" };

                  const hasExpired = new Date(twoFactorToken.expires) < new Date();

                  if (hasExpired) return { error: "Code Expired" };

                  await db.twoFactorToken.delete({
                        where: { id: twoFactorToken.id }
                  });

                  const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                  if (existingConfirmation) {
                        await db.twoFactorConfirmation.delete({
                              where: { id: existingConfirmation.id }
                        });
                  };

                  await db.twoFactorConfirmation.create({
                        data: { userId: existingUser.id }
                  });

            } else {
                  const twoFactorToken = await generateTwoFactorToken(existingUser.email)
                  await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token,);
                  return { twoFactor: true };
            };
      };

      try {
            await signIn("credentials", {
                  email,
                  password,
                  redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });
      } catch (error) {
            if (error instanceof AuthError) {
                  switch (error.type) {
                        case "CredentialsSignin":
                              return { error: "Invalid credentials. Please enter valid credentials." };
                        default:
                              return { error: "Oops! An internal server error has occurred. Please check the situation and try again" };
                  };
            };
            throw error
      };
};