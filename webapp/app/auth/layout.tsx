import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/libs/tw-merge";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iDevStore",
  description: "Everything you need to manage your store",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <main className={cn(inter.className, "bg-white text-slate-800")}>
      {children}  
    </main>
  );
};