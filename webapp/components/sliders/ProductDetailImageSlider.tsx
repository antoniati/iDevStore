"use client";

import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ProductDetailImageSlider = ({ images }: { images: string[] }) => {
      const [currentImage, setCurrentImage] = useState<number>(0);

      const mainSliderRef = useRef<Slider>(null);

      const mainSliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
      };


      const handleThumbnailClick = (index: number) => {
            setCurrentImage(index);
            if (mainSliderRef.current) {
                  mainSliderRef.current.slickGoTo(index);
            }
      };

      return (
            <div className="relative overflow-hidden">
                  <Slider ref={mainSliderRef} {...mainSliderSettings}>
                        {images.map((image, index) => (
                              <div key={index}>
                                    <img
                                          src={image}
                                          alt={`Product Image ${index}`}
                                          style={{ width: "100%", height: "auto" }}
                                    />
                              </div>
                        ))}
                  </Slider>

                  <div className="flex w-full">
                        {images.map((image, index) => (
                              <div key={index} onClick={() => handleThumbnailClick(index)}>
                                    <img
                                          src={image}
                                          alt={`Product Thumbnail ${index}`}
                                          style={{
                                                width: "100px",
                                                height: "100px",
                                                cursor: "pointer",
                                                border: index === currentImage ? "2px solid blue" : "1px solid",
                                          }}
                                    />
                              </div>
                        ))}
                  </div>
            </div>
      );
};
