"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";
import { UserRegisterSchema } from "@/schemas";
import { generateVerificationToken } from "./generate-tokens";
import { sendVerificationEmail } from "@/libs/mail";
import { getUserByEmail } from "../read/get-users";

export const registerUser = async (values: z.infer<typeof UserRegisterSchema>) => {
      const validatedFields = UserRegisterSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or non-existent fields. Please enter valid fields" };

      const {
            email,
            password,
            firstName,
            lastName
      } = validatedFields.data;

      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await getUserByEmail(email);

      if (existingUser) return { error: "This email is already in use. Please try a different email." };

      await db.user.create({
            data: {
                  firstName,
                  lastName,
                  email,
                  role: "USER",
                  password: hashedPassword
            },
      });

      const verificationToken = await generateVerificationToken(email);

      await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
      );

      return { success: "An account confirmation email has been sent. Please check your inbox to complete your registration." };
};