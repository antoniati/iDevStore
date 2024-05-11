import { ProductDetailsSection } from "@/components/sections/ProductDetailsSection";

export default function ProductDetails({ params }: { params: { productId: string } }) {
      return (
            <ProductDetailsSection productId={params.productId} />
      )
}