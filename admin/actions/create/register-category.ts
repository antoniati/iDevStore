"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { CategorySchema } from "@/schemas";
import { currentUser } from "@/hooks/use-server-side-user";
import { getCategoryByName } from "../read/get-categories";

export const registerCategory = async (values: z.infer<typeof CategorySchema>) => {
      const validatedFields = CategorySchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or non-existent fields. Please enter valid fields." };

      const { name, parent } = validatedFields.data;

      const existingCategoryName = await getCategoryByName(name);

      if (existingCategoryName) return { error: "This name is already registered. Please try a different name." }

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.category.create({
                  data: {
                        name,
                        parent,
                        userId: user.id,
                  },
            });

            return { success: "Category registered successfully." };
      } else {
            return { error: "You do not have permission to perform this action!" };
      };
};