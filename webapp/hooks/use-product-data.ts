"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllProducts, getProductById } from "@/actions/read/get-products";
import { Product } from "@prisma/client";

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
            fetchAllProducts();
      }, []);


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

export const useProductSearch = (productData: Product[]) => {
      const [filteredCProductData, setFilteredCProductData] = useState(productData);

      const handleSearchProductsData = useCallback((term: string) => {
            const searchTerm = term.toLowerCase();
            const productsFound = productData.filter(product => {
                  const productNumberLowerCase = (product.name ?? "").toLowerCase();

                  const matchesTerm =
                        productNumberLowerCase.includes(searchTerm)

                  return matchesTerm;
            });

            setFilteredCProductData(productsFound);
      }, [productData]);

      return { filteredCProductData, handleSearchProductsData };
};