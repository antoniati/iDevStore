import { DeleteSection } from "@/components/sections/DeleteSection";
import { deleteProduct } from "@/actions/delete/delete-products";

export default function DeleteProduct({ params }: { params: { productId: string } }) {
      return (
            <DeleteSection
                  name="Product"
                  urlBackPage={"/products"}
                  idToDeleteData={params.productId}
                  deleteFunction={deleteProduct}
            />
      );
};