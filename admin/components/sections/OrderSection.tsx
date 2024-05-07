"use client";

import { BsClipboardData } from "react-icons/bs";
import { Divider, Flex, } from "@tremor/react";
import { AnimBottomToTop, OrderTable, TitleSection } from "@/components";
import { useOrderData } from "@/hooks/use-order-data";

export const OrderSection = () => {
      const { orders } = useOrderData();

      return (
            <Flex className="flex-col justify-start items-start space-y-4">
                  <TitleSection
                        icon={BsClipboardData}
                        title="Orders"
                  />
                  <AnimBottomToTop>
                        <OrderTable orders={orders} />
                  </AnimBottomToTop>
                  <Divider />
            </Flex>
      );
};