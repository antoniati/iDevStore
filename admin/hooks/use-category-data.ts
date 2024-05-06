"use client";

import { useEffect, useState } from "react";
import { getAllCategories, getCategoryById, getCategoryByName } from "@/actions/read/get-categories";

interface CategoryProps {
      id: string,
      name: string,
      parent: string | null,
};

export const useCategoryData = () => {
      const [categories, setCategories] = useState<CategoryProps[]>([]);

      const fetchCategories = async () => {
            const allCategories = await getAllCategories();

            if (allCategories) {
                  setCategories(allCategories);
            };
      };

      useEffect(() => {
            fetchCategories();
      }, []);

      return { categories, fetchCategories };
};

export const useCategoryDataById = (categoryId: string) => {
      const [category, setCategory] = useState<CategoryProps | null>(null);

      const handleFetchCategoryById = async () => {
            const categoryFound = await getCategoryById(categoryId);

            if (categoryFound) {
                  setCategory(categoryFound);
            };
      };

      useEffect(() => {
            handleFetchCategoryById();
      }, []);

      return { category, handleFetchCategoryById };
};

export const useCategoryDataByName = (categoryName: string) => {
      const [category, setCategory] = useState<CategoryProps | null>(null);

      const handleFetchCategoryByName = async () => {
            const categoryFound = await getCategoryByName(categoryName);

            if (categoryFound) {
                  setCategory(categoryFound);
            };
      };

      useEffect(() => {
            handleFetchCategoryByName();
      }, []);

      return { category, handleFetchCategoryByName };
};