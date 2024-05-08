"use client";

import { useRouter } from "next/navigation";
import { LoginButtonProps } from "@/types";

export const LoginButton = ({ children, pageUrl }: LoginButtonProps) => {
      const router = useRouter();

      const handleOnClickButton = () => router.push(pageUrl);

      return (
            <span
                  className={"cursor-pointer"}
                  onClick={handleOnClickButton}
            >
                  {children}
            </span>
      );
};