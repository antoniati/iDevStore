"use client";

import { Button, Callout, Card, Divider, Flex, Subtitle, Text, Title } from "@tremor/react";
import { useProductData } from "@/hooks/use-product-data";
import { BsEyeFill } from "react-icons/bs";

export const NewsProducts = () => {
      const { products } = useProductData();

      return (
            <section className="main-container">
                  {products.length > 0 ? (
                        <Flex className="flex-col space-y-4">
                              <Title className="w-full text-center mt-4">
                                    Discover our diverse selection of amazing products
                              </Title>
                              <Divider />
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
                                    {products.map((product) => (
                                          <Card key={product.id} className="p-2">
                                                <Button variant="light">
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
                                                </Button>
                                                <Flex className="flex-col p-4 justify-start items-start space-y-4">
                                                      <Title className="font-medium">{product.name}</Title>
                                                      <Flex>
                                                            <Subtitle className="font-bold">
                                                                  {product.price}
                                                            </Subtitle>
                                                            <Button size={"xs"} onClick={() => { }}>
                                                                  add to cart
                                                            </Button>
                                                      </Flex>
                                                </Flex>
                                          </Card>
                                    ))}
                              </div>
                        </Flex>
                  ) : (
                        <Callout className="w-full" title="products not found" />
                  )}
                  <Divider />
                  <div className="w-full flex flex-col sm:flex-row justify-center items-center p-2">
                        <Button
                              className="text-slate-50 hover:text-slate-100 bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"
                              size={"lg"}
                              variant={"secondary"}
                        >
                              All Products
                        </Button>
                  </div>
            </section >
      );
};