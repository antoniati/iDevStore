"use server";

import { db } from "@/libs/db";

export const getAllProducts = async () => {
      try {
            const allProducts = await db.product.findMany();
            return allProducts;

      } catch (error) {
            console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
            return [];
      }
};

export const getProductById = async (id: string | undefined) => {
      try {
            const product = await db.product.findUnique({ where: { id } });
            return product;

      } catch {
            return null;
      };
};

export const getProductByName = async (name: string | undefined) => {
      try {
            const product = await db.product.findFirst({ where: { name } });
            return product;

      } catch {
            return null;
      };
};