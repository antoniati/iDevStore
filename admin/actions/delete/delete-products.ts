"use server";

import { db } from "@/libs/db";

export const deleteProduct = async (productId: string): Promise<{ success: string, error: string }> => {
      try {
            const response = await db.product.delete({
                  where: { id: productId },
            });

            if (!response) {
                  return { error: `Oops! An error occurred while trying to delete. The ID does not exist.`, success: "" };
            };

            return { success: `Product Deleted Successfully!`, error: "" };

      } catch (error) {
            console.error("Error deleting Product:", error);
            return { success: "", error: "Oops! An internal error occurred while trying to delete Product." };
      };
};