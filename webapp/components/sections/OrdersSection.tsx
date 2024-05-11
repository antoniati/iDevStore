"use client";


import { Divider, Flex, Title, } from "@tremor/react";
import { OrderTable } from "../table/Ordertable";
import { useOrderData } from "@/hooks/use-order-data";
import { useCurrentUserByClientSide } from "@/hooks/use-client-side-user";
import { useEffect, useState } from "react";
import { Order } from "@prisma/client";

export const OrdersSection = () => {
      const [ordersData, setOrdersData] = useState<Order[] | []>([]);
      const { orders } = useOrderData();

      const currentUser = useCurrentUserByClientSide();

      const filteredOrders = orders.filter(order => order.userId === currentUser?.id)

      const handleFetchOrdersData = () => {
            if (filteredOrders) {
                  setOrdersData(filteredOrders);
            } else {
                  setOrdersData([])
            }
      }

      useEffect(() => {
            handleFetchOrdersData();
      }, [currentUser])

      return (
            <Flex className="main-container" style={{ paddingTop: "140px" }}>
                  <Title>Your Orders</Title>
                  <Divider />
                  <OrderTable orders={ordersData} />
            </Flex>
      );
};