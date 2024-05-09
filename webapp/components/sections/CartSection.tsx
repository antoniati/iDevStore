"use client";

import { useContext } from "react";
import { Callout, Card, Divider, Flex, Title } from "@tremor/react";
import { CartContext } from "@/context/CartContext";
import { CartTable } from "@/components";
import { useProductData } from "@/hooks/use-product-data";
import { BsCart } from "react-icons/bs";
import { OrderForm } from "../form/OrderForm";

export const CartSection = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      };

      const { cartProducts, addProduct, removeProduct, clearCart } = cartContext;

      const { products } = useProductData();

      return (
            cartProducts && cartProducts?.length > 0 ? (
                  <Flex className="p-2 justify-start items-start flex-col sm:flex-row" style={{ gap: "10px", paddingTop: "80px" }}>
                        <CartTable
                              products={products}
                              cartProducts={cartProducts}
                              addProduct={addProduct}
                              removeProduct={removeProduct}
                        />
                        <OrderForm
                              cartProducts={cartProducts}
                              clearCart={clearCart}
                        />
                  </Flex>
            ) : (
                  <div className="main-container" style={{ paddingTop: "40px" }}>
                        <Flex className="justify-start items-start flex-col p-4" style={{ paddingTop: "80px" }}>
                              <Flex className="justify-start space-x-2 items-center">
                                    <BsCart size={20} />
                                    <Title>Shopping Cart</Title>
                              </Flex>
                              <Divider />
                              <Callout
                                    className="w-full p-4"
                                    title="Your cart is empty."
                              />
                        </Flex>
                  </div>
            )
      );
};