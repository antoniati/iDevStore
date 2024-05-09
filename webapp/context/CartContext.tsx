"use client";

import React, { createContext, useEffect, useState } from "react";

interface CartContextProps {
      cartProducts: string[];
      addProduct: (productId: string) => void;
      removeProduct: (productId: string) => void;
      clearCart: () => void;
};

export const CartContext = createContext<CartContextProps | null>(null);

interface CartContextProviderProps {
      children: React.ReactNode;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
      const [cartProducts, setCartProducts] = useState<string[]>([]);

      useEffect(() => {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                  setCartProducts(JSON.parse(storedCart));
            }
      }, []);

      const addProduct = (productId: string) => {
            setCartProducts((prev) => {
                  const updatedCartProducts = [...prev, productId];
                  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
                  return updatedCartProducts;
            });
      };

      const removeProduct = (productId: string) => {
            setCartProducts((prev) => {
                  const index = prev.findIndex((item) => item === productId);

                  if (index === -1) return prev;

                  const updatedCartProducts = [...prev];

                  updatedCartProducts.splice(index, 1);
                  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

                  return updatedCartProducts;
            });
      };

      const clearCart = () => {
            setCartProducts([]);
            localStorage.removeItem("cart");
      };

      const contextValue = {
            cartProducts,
            addProduct,
            removeProduct,
            clearCart,
      };

      return (
            <CartContext.Provider value={contextValue}>
                  {children}
            </CartContext.Provider>
      );
};