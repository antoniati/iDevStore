"use client";

import { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Flex } from "@tremor/react";
import { useProductData } from "@/hooks/use-product-data";

export const FeaturedProducts = () => {

      const { products } = useProductData();

      const [currentSlide, setCurrentSlide] = useState(0);

      const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: (index: number) => setCurrentSlide(index),
            autoplay: true,
            autoplaySpeed: 15000,
            pauseOnHover: false,
            pauseOnFr: false,
            pauseOnFocus: false,
      };

      return (
            <section className="featured-container">
                  {products.length > 0 && (
                        <div key={products[0].id} className="main-container">
                              <div className="featured-content">
                                    <div className="featured-info">
                                          <h1 className="featured-title">{products[1].name}</h1>
                                          <p className="featured-description">{products[1].description}</p>
                                          <Flex className="justify-start space-x-2">
                                                <Button onClick={() => { }}>
                                                      Add to Cart
                                                </Button>
                                                <Button onClick={() => { }} variant="secondary">
                                                      More Details
                                                </Button>
                                          </Flex>
                                    </div>
                                    <div className="featured-image">
                                          <img
                                                src={products[1].images[0]}
                                                alt={`Image of Product  ${products[1].name}`}
                                                className="cover"
                                          />
                                    </div>
                              </div>
                        </div>
                  )}
            </section>
      );
};