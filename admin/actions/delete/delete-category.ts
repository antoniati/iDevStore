"use server";
import { db } from "@/libs/db";

export const deleteCategory = async (categoryId: string): Promise<{ success: string, error: string }> => {
      try {
            const response = await db.category.delete({
                  where: { id: categoryId },
            });

            if (!response) {
                  return {
                        error: `Oops! An error occurred while trying to delete. The ID does not exist.`,
                        success: ""
                  };
            };

            return {
                  success: `Category Deleted Successfully!`,
                  error: ""
            };
      } catch (error) {
            console.error("Oops! An error occurred while deleting the Category:", error);

            return {
                  success: "",
                  error: "Oops! An error occurred while deleting the Category"
            };
      };
};