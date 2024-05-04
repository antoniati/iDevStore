import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { cn } from "@/libs/tw-merge";
import { HeaderLandigPage, MainFooter } from "@/components";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iDevStore",
  description: "Everything you need to manage your store",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();

  return (
    <SessionProvider session={session} >
      <html lang="en">
        <body
          className={cn(inter.className, "bg-white text-slate-800")}
          suppressHydrationWarning={true}
        >
          <HeaderLandigPage />
          {children}
          <MainFooter />
        </body>
      </html>
    </SessionProvider>
  );
};