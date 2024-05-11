"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { BsEyeFill, BsSearch } from "react-icons/bs";
import { Button, Callout, Card, Divider, Flex, Metric, Subtitle, TextInput, Title } from "@tremor/react";
import { useProductData } from "@/hooks/use-product-data";
import { CartContext } from "@/context/CartContext";
import { cn } from "@/libs/tw-merge";
import { BeatLoading } from "../loadings/BeatLoading";
import Link from "next/link";

export const SearchProductSection = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { addProduct } = cartContext;
      const { products } = useProductData();
      const [searchTerm, setSearchTerm] = useState<string>("");
      const [filteredProducts, setFilteredProducts] = useState(products);

      useEffect(() => {
            if (searchTerm.trim() === "") {
                  setFilteredProducts(products);
            } else {
                  const filtered = products.filter((product) =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setFilteredProducts(filtered);
            }
      }, [searchTerm, products]);

      const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
      };

      return (
            <section className="main-container">
                  {products.length > 0 && (
                        <header className="w-full flex flex-col justify-end fixed right-0 z-10" style={{ height: "236px", backgroundColor: "#FFF" }}>
                              <Flex className={cn("main-container", "space-y-4")}>
                                    <Flex className="items-start flex-col px-4" style={{ gap: "20px" }}>
                                          <Metric className="font-medium">Search Products</Metric>
                                          <div className="w-full space-y-1" style={{ maxWidth: "500px" }}>
                                                <h2 className="text-tremor-default font-medium ml-1">Search product by name</h2>
                                                <TextInput
                                                      icon={BsSearch}
                                                      type="text"
                                                      value={searchTerm}
                                                      onChange={handleSearchInputChange}
                                                      placeholder="Enter product name"
                                                      className="border-2"
                                                />
                                          </div>
                                    </Flex>
                                    <Divider style={{ paddingBottom: "10px" }} />
                              </Flex>
                        </header>
                  )}

                  {/* Renderizar produtos */}
                  {filteredProducts.length > 0 ? (
                        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4" style={{ paddingTop: "240px", gap: "20px" }}>
                              {filteredProducts.map((product) => (
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
                                          <Flex className="flex-col p-4 justify-start items-start space-y-4">
                                                <Title className="font-medium">{product.name}</Title>
                                                <Flex>
                                                      <Subtitle className="font-bold">{product.price}</Subtitle>
                                                      <Button size={"xs"} onClick={() => addProduct(product.id)}>
                                                            add to cart
                                                      </Button>
                                                </Flex>
                                          </Flex>
                                    </Card>
                              ))}
                        </div>
                  ) : (
                        <div className="w-full px-4" style={{ paddingTop: "240px" }}>
                              <p className="bg-slate-50 w-full p-4 rounded-tremor-default text-slate-600">
                                    No products found. Please try a different name
                              </p>
                        </div>
                  )}
            </section>
      );
};
