"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ProductSchema } from "@/schemas";
import { PropsOfProperties } from "@/types";
import { useProductDataById } from "@/hooks/use-product-data";
import { updateProduct } from "@/actions/update/update-product";
import { convertToPropsOfProperties } from "@/utils/format-data";

export function useProductForm(productId: string) {
      const { product } = useProductDataById(productId);

      const form = useForm({
            resolver: zodResolver(ProductSchema),
      });

      const initialProperties = convertToPropsOfProperties(product?.properties);

      const [properties, setProperties] = useState<PropsOfProperties[]>(initialProperties);
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      useEffect(() => {
            setIsLoadingPage(true);

            if (product) {
                  const convertedProperties = convertToPropsOfProperties(product.properties);
                  setProperties(convertedProperties);

                  form.reset({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        categoryId: product.categoryId ?? "",
                        categoryName: product.categoryName ?? "",
                        properties: convertedProperties,
                  });
            }

            setIsLoadingPage(true);
      }, [product]);

      const handleFormSubmit = async (values: z.infer<typeof ProductSchema>) => {
            setIsPending(true);

            values.properties = properties;

            try {
                  const response = await updateProduct(values, productId);
                  if (response?.error) {
                        setError(response.error);
                  } else if (response?.success) {
                        setSuccess(response.success);
                  }
            } catch (error) {
                  setError("Error submitting form.");
            } finally {
                  setIsPending(false);
            };
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };


      return {
            form,
            properties,
            setProperties,
            success,
            error,
            isPending,
            handleFormSubmit,
            isLoadingPage,
            cleanMessages,
      };
};
