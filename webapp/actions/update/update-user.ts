"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { UserEditSchema } from "@/schemas";
import { currentUser } from "@/hooks/use-server-side-user";
import { getUserByEmail } from "@/actions/read/get-users";

export const updateUser = async (values: z.infer<typeof UserEditSchema>, userId: string) => {
      const validatedFields = UserEditSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or missing fields. Please enter valid fields." };

      const { firstName, lastName, email, phone, image } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser && existingUser.id !== userId) return { error: `There is already a user registered with this email. Please try a different email.` };

      const user = await currentUser();

      if (user && user.id === userId) {
            await db.user.update({
                  where: { id: userId },
                  data: {
                        firstName,
                        lastName,
                        email,
                        phone,
                        image,
                  },
            });

            return { success: `Your account details were successfully updated.`, };
      } else {
            return { error: `You do not have permission to perform this action!` };
      };
};