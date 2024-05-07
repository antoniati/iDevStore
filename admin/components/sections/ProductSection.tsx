"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillPlusCircleFill, BsBoxSeam } from "react-icons/bs";
import { Button, Divider, Flex, } from "@tremor/react";
import { AnimBottomToTop, BeatLoading, ProductTable, TitleSection } from "@/components";
import { useProductData } from "@/hooks/use-product-data";

export const ProductSection = () => {
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const { products } = useProductData();

      const router = useRouter();

      const handleGoRegisterPage = () => {
            setIsLoadingPage(true);
            router.push("/products/register");
      };

      return (
            <Flex className="flex-col justify-start items-start space-y-4">
                  <TitleSection
                        icon={BsBoxSeam}
                        title="Products"
                  />

                  <AnimBottomToTop>
                        <ProductTable products={products} />
                  </AnimBottomToTop>

                  <Divider />

                  {!isLoadingPage ? (
                        <Button onClick={handleGoRegisterPage}>
                              <div className="flex items-center space-x-2">
                                    <BsFillPlusCircleFill size={20} />
                                    <span>Register Product</span>
                              </div>
                        </Button>
                  ) : (
                        <BeatLoading />
                  )}
            </Flex>
      );
};