import { DeleteSection } from "@/components/sections/DeleteSection";
import { deleteCategory } from "@/actions/delete/delete-category";

export default function DeleteCategory({ params }: { params: { categoryId: string } }) {
      return (
            <DeleteSection
                  name="Category"
                  urlBackPage={"/category"}
                  idToDeleteData={params.categoryId}
                  deleteFunction={deleteCategory}
            />
      );
};