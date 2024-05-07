"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { ProductSchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";
import { getProductByName } from "../read/get-products";

export const updateProduct = async (values: z.infer<typeof ProductSchema>, productId: string) => {
      const validatedFields = ProductSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Invalid or missing fields. Please enter valid fields." };

      const { description, price, name, images, categoryId, categoryName, properties = [] } = validatedFields.data;

      const existingProductName = await getProductByName(name);

      if (existingProductName && existingProductName.id !== productId) {
            return { error: `There is already a product registered with this name. Please try a different name.` };
      }

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.product.update({
                  where: { id: productId },
                  data: {
                        price,
                        images: images,
                        name,
                        description,
                        userId: user.id,
                        categoryId: categoryId,
                        categoryName: categoryName,
                        properties: properties,
                  },
            });

            return { success: `Product Updated Successfully.`, };
      } else {
            return { error: `You do not have permission to perform this action!` };
      };
};