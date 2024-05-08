import { UserEditForm } from "@/components";

export default function UserEditPage({ params }: { params: { userId: string } }) {
      return (
            <UserEditForm userId={params.userId} />
      );
};