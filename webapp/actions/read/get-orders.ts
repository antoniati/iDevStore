"use server";

import { db } from "@/libs/db";

export const getAllOrders = async () => {
      try {
            const allOrders = await db.order.findMany();
            return allOrders;

      } catch (error) {
            console.error("Ops! Ocorreu um erro ao buscar os pedidos:", error);
            return [];
      }
};

export const getOrderById = async (id: string | undefined) => {
      try {
            const order = await db.order.findUnique({ where: { id } });
            return order;

      } catch {
            return null;
      };
};