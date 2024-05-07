import { ProductEditForm } from "@/components";

export default function ProductEditPage({ params }: { params: { productId: string } }) {
      return (
            <ProductEditForm productId={params.productId} />
      );
}
