"use client";

import { useRouter } from "next/navigation";

export const LoginButton = ({ children, pageUrl }: { children: React.ReactNode, pageUrl: string }) => {
      const router = useRouter();

      const handleOnClickButton = () => router.push(`${pageUrl}`);

      return (
            <span
                  className={"cursor-pointer"}
                  onClick={handleOnClickButton}
            >
                  {children}
            </span>
      );
};