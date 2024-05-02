import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/libs/tw-merge";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iDevStore",
  description: "SAAS de Gestão de E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, "text-slate-800")}>
        {children}
      </body>
    </html>
  );
};