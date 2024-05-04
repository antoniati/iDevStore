"use server";

import * as z from "zod";
import { db } from "@/libs/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/libs/mail";
import { LoginSchema } from "@/schemas";
import { generateTwoFactorToken, generateVerificationToken, getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail, getUserByEmail } from "@/actions";

export const loginSession = async (values: z.infer<typeof LoginSchema>) => {
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

      // TODO: Next Auth SignIn...
      console.log(existingUser.isTwoFactorEnabled)
};
