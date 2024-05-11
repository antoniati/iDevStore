"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Button, Flex } from "@tremor/react";
import { BeatLoading } from "@/components";
import { useProductData } from "@/hooks/use-product-data";
import { CartContext } from "@/context/CartContext";

export const FeaturedProducts = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      };

      const { addProduct } = cartContext;

      const { products } = useProductData();

      if (!products[0]) {
            return (
                  <div style={{ paddingBlock: "100px" }}>
                        <BeatLoading />
                  </div>
            )
      };

      const router = useRouter();

      return (
            <section className="featured-container">
                  <div key={products[0]?.id} className="main-container">
                        <div className="featured-content">
                              <div className="featured-info">
                                    <h1 className="featured-title">{products[0]?.name}</h1>
                                    <p className="featured-description">{products[0]?.description}</p>
                                    <Flex className="justify-start space-x-2">
                                          <Button onClick={() => addProduct(products[0]?.id)}>
                                                Add to Cart
                                          </Button>
                                          <Button onClick={() => router.push(`/products/details/${products[0]?.id}`)} variant="secondary">
                                                More Details
                                          </Button>
                                    </Flex>
                              </div>
                              <div className="featured-image">
                                    <img
                                          src={products[0]?.images[0]}
                                          alt={`Image of Product  ${products[0]?.name}`}
                                          className="cover"
                                    />
                              </div>
                        </div>
                  </div>
            </section>
      );
};