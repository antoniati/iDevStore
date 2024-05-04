"use client";

import { useRouter } from "next/navigation";

export const LoginButton = ({ children, }: { children: React.ReactNode }) => {
      const router = useRouter();

      const handleOnClickButton = () => router.push("/auth/login");

      return (
            <span
                  className={"cursor-pointer"}
                  onClick={handleOnClickButton}
            >
                  {children}
            </span>
      );
};