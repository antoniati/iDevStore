"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { getAllProducts, getProductById } from "@/actions/read/get-products";

export const useProductData = () => {
      const [products, setProducts] = useState<Product[] | []>([]);

      const fetchAllProducts = async () => {
            try {
                  const allProducts = await getAllProducts();

                  if (allProducts) {
                        setProducts(allProducts);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
            };
      };

      useEffect(() => {
            if (products.length === 0) {
                  fetchAllProducts();
            }
      }, [products]);

      return { products, fetchAllProducts };
};

export const useProductDataById = (productId: string) => {
      const [product, setProduct] = useState<Product | null>(null);

      const fetchOneProduct = async () => {
            try {
                  const productFound = await getProductById(productId);

                  if (productFound) {
                        setProduct(productFound);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar o produto:", error);
            };
      };

      useEffect(() => {
            fetchOneProduct();
      }, []);

      return { product };
};