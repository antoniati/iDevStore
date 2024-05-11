import { UserEditForm } from "@/components/form/UserEditForm";

export default function UserEditPage({ params }: { params: { userId: string } }) {
      return (
            <UserEditForm userId={params.userId} />
      );
};