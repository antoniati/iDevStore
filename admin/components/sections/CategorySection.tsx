"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillPlusCircleFill, BsLayers } from "react-icons/bs";
import { Button, Divider, Flex, } from "@tremor/react";
import { AnimBottomToTop, BeatLoading, CategoryTable, TitleSection } from "@/components";
import { useCategoryData } from "@/hooks/use-category-data";

export const CategorySection = () => {
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const { categories } = useCategoryData();

      const router = useRouter();

      const handleGoCategoryRegisterPage = () => {
            setIsLoadingPage(true);
            router.push("/category/register");
      };

      return (
            <Flex className="flex-col justify-start items-start space-y-4">
                  <TitleSection
                        icon={BsLayers}
                        title="Categories"
                  />

                  <AnimBottomToTop>
                        <CategoryTable categories={categories} />
                  </AnimBottomToTop>

                  <Divider />

                  {!isLoadingPage ? (
                        <Button onClick={handleGoCategoryRegisterPage}>
                              <div className="flex items-center space-x-2">
                                    <BsFillPlusCircleFill size={20} />
                                    <span>Register Category</span>
                              </div>
                        </Button>
                  ) : (<BeatLoading />)}
            </Flex>
      );
};