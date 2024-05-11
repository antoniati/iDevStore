"use server";
import { db } from "@/libs/db";
import { getVerificationTokenByToken } from "../read/get-tokens";
import { getUserByEmail } from "../read/get-users";

export const newVerification = async (token: string) => {
      const existingToken = await getVerificationTokenByToken(token);

      if (!existingToken) return { error: "Existing Token" };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return { error: "Token Expired" };

      const existingUser = await getUserByEmail(existingToken.email);

      if (!existingUser) return { error: "Email does not exist" };

      await db.user.update({
            where: { id: existingUser.id },
            data: {
                  emailVerified: new Date(),
                  email: existingToken.email
            }
      });

      await db.verificationToken.delete({
            where: { id: existingToken.id }
      });

      return { success: "Email verified successfully" };
};