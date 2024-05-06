"use server";

import { db } from "@/libs/db";

export const getAllCategories = async () => {
      try {
            const allCategories = await db.category.findMany({
                  select: {
                        id: true,
                        name: true,
                        parent: true,
                  },
            });

            return allCategories;

      } catch (error) {
            console.error("Ops! Ocorreu um erro ao buscar as produtos:", error);
            return [];
      };
};

export const getCategoryById = async (id: string | undefined) => {
      try {
            const category = await db.category.findUnique({ where: { id } });
            return category;
      } catch {
            return null;
      };
};

export const getCategoryByName = async (name: string | undefined) => {
      try {
            const category = await db.category.findFirst({ where: { name } });
            return category;
      } catch {
            return null;
      };
};