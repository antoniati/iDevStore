"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";
import { UserRegisterSchema } from "@/schemas";

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

      await db.user.create({
            data: {
                  firstName,
                  lastName,
                  email,
                  password: hashedPassword
            },
      });

      // TODO: Send confirmation email with token.

      return { success: "An account confirmation email has been sent. Please check your inbox to complete your registration." };
};