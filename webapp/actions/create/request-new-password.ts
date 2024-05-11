"use server"

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/libs/mail";
import { getUserByEmail } from "../read/get-users";
import { generatePasswordResetToken } from "./generate-tokens";

export const handleRequestNewPassword = async (values: z.infer<typeof ResetSchema>): Promise<{ success?: string; error?: string; }> => {
      const validatedFields = ResetSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or non-existent fields. Please enter valid fields" };

      const { email } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
            const response = sendResetPasswordoken(email);
            return response;

      } else if (!existingUser) {
            return { error: "Non-existing user. Please enter a valid email address." };
      } else {
            return { error: "An error occurred while sending a password reset request." };
      };
};

export const sendResetPasswordoken = async (email: string) => {
      const passwordResetToken = await generatePasswordResetToken(email);

      await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

      return { success: "Password reset email sent. Please check your inbox and follow the instructions to reset your password." };
};