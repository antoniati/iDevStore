"use client";

import Link from 'next/link';
import React, { useContext } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { Button, Card, Divider, Flex, Metric, Subtitle, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react';
import { useProductData } from '@/hooks/use-product-data';
import { CartContext } from '@/context/CartContext';
import { Product } from '@prisma/client';
import { BeatLoading } from '../loadings/BeatLoading';

const getPriceValue = (priceString: string) => {
      return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};

export const AllProductsSection = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { addProduct } = cartContext;

      const { products } = useProductData();

      if (!products) {
            return (
                  <div style={{ paddingBlock: "100px" }}>
                        <BeatLoading />
                  </div>
            )
      };

      const sortByPrice = (products: Product[], ascending = true) => {
            return [...products].sort((a, b) => {
                  const priceA = getPriceValue(a.price);
                  const priceB = getPriceValue(b.price);

                  if (ascending) {
                        return priceA - priceB;
                  } else {
                        return priceB - priceA;
                  }
            });
      };

      return (
            <section className='main-container'>
                  <div style={{ paddingTop: "100px" }}>
                        <Metric>Products</Metric>
                  </div>
                  <Divider style={{ marginBlock: "10px" }} />
                  <TabGroup>
                        <TabList >
                              <Tab>All</Tab>
                              <Tab>Price: Low -&gt; High</Tab>
                              <Tab>Price: High -&gt; Low</Tab>
                        </TabList>
                        <TabPanels className='overflow-auto p-2' style={{ maxHeight: "600px" }}>
                              <TabPanel>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
                                          {products.map((product) => (
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
                              </TabPanel>

                              <TabPanel>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
                                          {sortByPrice(products, true).map((product) => (
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
                              </TabPanel>

                              <TabPanel>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
                                          {sortByPrice(products, false).map((product) => (
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
                              </TabPanel>
                        </TabPanels>
                  </TabGroup>
            </section>
      );
};
