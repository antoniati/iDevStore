"use client";

import { useEffect, useState } from "react";
import { Order } from "@prisma/client";
import { getAllOrders, getOrderById } from "@/actions/read/get-orders";

export const useOrderData = () => {
      const [orders, setOrders] = useState<Order[] | []>([]);

      const fetchAllOrders = async () => {
            try {
                  const allOrders = await getAllOrders();

                  if (allOrders) {
                        setOrders(allOrders);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar os pedidos:", error);
            };
      };

      useEffect(() => {
            fetchAllOrders();
      }, []);

      return { orders };
};

export const useOrderDataById = (orderId: string) => {
      const [order, setOrder] = useState<Order | null>(null);

      const fetchOneOrder = async () => {
            try {
                  const orderFound = await getOrderById(orderId);

                  if (orderFound) {
                        setOrder(orderFound);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar o pedido:", error);
            };
      };

      useEffect(() => {
            fetchOneOrder();
      }, []);

      return { order };
};