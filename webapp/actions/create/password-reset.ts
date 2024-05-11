"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "../read/get-tokens";
import { getUserByEmail } from "../read/get-users";

export const handleResetPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null,) => {
      if (!token) return { error: "Nonexistent token" };

      const validatedFields = NewPasswordSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or non-existent fields. Please enter valid fields." };

      const { password } = validatedFields.data;

      const existingToken = await getPasswordResetTokenByToken(token);

      if (!existingToken) return { error: "Invalid token. Please enter a valid token" };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return { error: "Token Expired. Please enter a new, updated token." };

      const existingUser = await getUserByEmail(existingToken.email);

      const hashedPassword = await bcrypt.hash(password, 10);

      if (existingUser) {
            await db.user.update({
                  where: { id: existingUser.id },
                  data: { password: hashedPassword },
            });

            await db.passwordResetToken.delete({
                  where: { id: existingToken.id }
            });

            return { success: "Password updated successfully!" };

      } else if (!existingUser) {
            return { error: "Non-existing user. Please enter a valid email address." };
      } else {
            return { error: `Error resetting password.` };
      };
};