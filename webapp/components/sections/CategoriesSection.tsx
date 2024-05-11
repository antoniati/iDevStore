"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { BsEyeFill } from "react-icons/bs";
import { Button, Card, Divider, Flex, Grid, Metric, Select, SelectItem, Subtitle, Title } from "@tremor/react";
import { BeatLoading } from "@/components";
import { useCategoriesSearch, useCategoryData } from "@/hooks/use-category-data";
import { useProductData } from "@/hooks/use-product-data";
import { CartContext } from "@/context/CartContext";
import { cn } from "@/libs/tw-merge";

export const CategoriesSection = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { addProduct } = cartContext;

      const { products } = useProductData();
      const { categories } = useCategoryData();

      const { filteredCategoriesData, handleSearchCategoriesData } = useCategoriesSearch(categories);

      const categoriesToDisplay = filteredCategoriesData.length > 0 ? filteredCategoriesData : categories;

      const productsByCategory: Record<string, typeof products[0][]> = {};

      products.forEach((product) => {
            const categoryId = product.categoryId ?? "unknown";
            if (!productsByCategory[categoryId]) {
                  productsByCategory[categoryId] = [];
            }
            productsByCategory[categoryId].push(product);
      });

      if (products.length === 0 && categories.length === 0) {
            return (
                  <div style={{ paddingBlock: "100px" }}>
                        <BeatLoading />
                  </div>
            )
      }

      return (
            <section className="main-container">
                  {products.length > 0 && categories.length > 0 && (
                        <header
                              className="w-full flex flex-col justify-end fixed right-0 z-10"
                              style={{ height: "236px", backgroundColor: "#FFF" }}
                        >
                              <Flex className={cn("main-container", "space-y-4")}>
                                    <Flex className="items-start flex-col sm:flex-row px-4" style={{ gap: "20px" }}>
                                          <Metric className="font-medium">
                                                Categories
                                          </Metric>
                                          <div className="w-full space-y-1" style={{ maxWidth: "400px" }}>
                                                <h2 className="text-tremor-default font-medium">
                                                      Select Category
                                                </h2>
                                                <Select
                                                      className="w-full border border-slate-300 rounded-tremor-default"
                                                      name={"select"}
                                                      placeholder="Click to select category"
                                                      onValueChange={(value) => handleSearchCategoriesData(value)}
                                                >
                                                      <SelectItem value="">All</SelectItem>
                                                      {categories.map((category) => (
                                                            <SelectItem key={category.id} value={category.name} />
                                                      ))}
                                                </Select>
                                          </div>
                                    </Flex>
                                    <Divider style={{ paddingBottom: "10px" }} />
                              </Flex>
                        </header>
                  )}

                  <div className="w-full" style={{ paddingTop: "220px" }}>
                        {categoriesToDisplay.map((category) => {
                              const productsInCategory = productsByCategory[category.id] || [];

                              if (productsInCategory.length === 0) {
                                    return (
                                          <div key={category.id} className="w-full mt-4">
                                                <Title className="w-full bg-blue-50 p-4">
                                                      {category.name}
                                                </Title>
                                                <div className="p-4">
                                                      <p>No products found for this category.</p>
                                                </div>
                                          </div>
                                    );
                              }


                              return (
                                    <div key={category.id} className="w-full space-y-1 mt-4">
                                          <Title className="w-full bg-blue-50 p-4">
                                                {category.name}
                                          </Title>

                                          <Grid numItems={1} numItemsSm={3} numItemsMd={4} style={{ gap: "20px", padding: "10px" }}>
                                                {productsInCategory.map((product) => (
                                                      <Card key={product.id} className="p-2">
                                                            <Link href={`/products/details/${product.id}`}>
                                                                  <div className="relative">
                                                                        <img
                                                                              src={product.images[0]}
                                                                              alt={`Imagem ${product.name}`}
                                                                              className="border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 rounded-tremor-default"
                                                                        />
                                                                        <div className="hover-product-image">
                                                                              <span className="absolute top-0 right-0 mr-4 mt-4">
                                                                                    <BsEyeFill size={36} color="#FFF" />
                                                                              </span>
                                                                        </div>
                                                                  </div>
                                                            </Link>
                                                            <Flex className="flex-col p-2 justify-between items-start space-y-4">
                                                                  <Flex className="flex-col items-start space-y-1 justify-start">
                                                                        <Subtitle className="font-bold">{product.name}</Subtitle>
                                                                        <Subtitle className="font-medium">{product.price}</Subtitle>
                                                                  </Flex>
                                                                  <Button size={"xs"} onClick={() => addProduct(product.id)} className="w-full">
                                                                        Add to Cart
                                                                  </Button>
                                                            </Flex>
                                                      </Card>
                                                ))}
                                          </Grid>
                                    </div>
                              );
                        })}
                  </div>
            </section >
      );
};