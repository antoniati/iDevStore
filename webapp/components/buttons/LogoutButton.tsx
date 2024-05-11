"use client";

import { logoutSession } from "@/actions/create/logout-session";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
      children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
      const router = useRouter();

      const executeLogoutSessionOnClick = async () => {
            await logoutSession();
            router.push("/");
      };

      return (
            <span
                  className={"w-full cursor-pointer"}
                  onClick={executeLogoutSessionOnClick}
            >
                  {children}
            </span>
      );
};
