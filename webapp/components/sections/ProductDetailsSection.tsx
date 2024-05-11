"use client";

import { useProductDataById } from '@/hooks/use-product-data';
import { Button, Divider, Flex, Grid, List, ListItem, Metric, Subtitle, Text, Title } from '@tremor/react';
import { useContext } from 'react';
import { BeatLoading, ProductDetailImageSlider } from '@/components';
import { CartContext } from '@/context/CartContext';

export const ProductDetailsSection = ({ productId }: { productId: string }) => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { addProduct } = cartContext;

      const { product } = useProductDataById(productId);

      if (!product) {
            return (
                  <div style={{ paddingBlock: "100px" }}>
                        <BeatLoading />
                  </div>
            )
      };

      const renderProperties = () => {
            if (!Array.isArray(product?.properties)) {
                  return <li><Text>No properties available</Text></li>;
            }

            return product.properties.map((property, index) => {
                  if (
                        property &&
                        typeof property === 'object' &&
                        'name' in property &&
                        'values' in property &&
                        Array.isArray(property.values)
                  ) {
                        const name = typeof property.name === 'string' ? property.name : '';
                        const values = Array.isArray(property.values)
                              ? property.values.map((value) => (typeof value === 'string' ? value : ''))
                              : [];

                        return (
                              <ListItem key={index} className='space-y-1'>
                                    <Flex>
                                          <Subtitle> {name}: </Subtitle>
                                          <Text> {values.join(", ")} </Text>
                                    </Flex>
                              </ListItem>
                        );
                  } else {
                        return (
                              <ListItem key={index}>
                                    <Text>Invalid property format</Text>
                              </ListItem>
                        );
                  }
            });
      };

      return (
            <section className="main-container">
                  <Grid numItems={1} numItemsLg={2} style={{ paddingTop: "80px" }}>
                        <div className="border border-slate-400 rounded-tremor-default" style={{ maxWidth: "550px" }}>
                              <ProductDetailImageSlider images={product?.images || []} />
                        </div>
                        <div className='w-full space-y-4 mt-4'>
                              <div className='space-y-4 mt-4'>
                                    <Metric>{product?.name}</Metric>
                                    <Text>{product?.description}</Text>
                              </div>
                              <Title className='font-bold'> Properties </Title>
                              <List className='space-y-4'>
                                    {renderProperties()}
                              </List>
                              <Divider />
                              <Button className="w-full" onClick={() => addProduct(productId)}>
                                    Add to Cart
                              </Button>
                        </div>
                  </Grid>
            </section>
      );
};
