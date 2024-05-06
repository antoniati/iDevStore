"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { CategorySchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";
import { getCategoryByName } from "@/actions/read/get-categories";

export const updateCategory = async (values: z.infer<typeof CategorySchema>, categoryId: string) => {
      const validatedFields = CategorySchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexsitentes. Por favor, insira campos válidos." };

      const { name, parent } = validatedFields.data;

      const existingCategoryName = await getCategoryByName(name);

      if (existingCategoryName && existingCategoryName.id !== categoryId) return { error: `Já existe uma categoria registrada com este nome. Por favor, tente um nome diferente.` };

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.category.update({
                  where: { id: categoryId },
                  data: {
                        name,
                        parent,
                        userId: user.id,
                  },
            });

            return { success: `Categoria Editada com Sucesso.`, };
      } else {
            return { error: `Você não tem permissão para executar esta ação!` };
      };
};