import { CategoryEditForm } from "@/components/forms/CategoryEditform";

export default function CategoryEditPage({ params }: { params: { categoryId: string } }) {
      return (
            <CategoryEditForm categoryId={params.categoryId} />
      );
};