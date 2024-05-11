import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header, MainFooter } from "@/components";
import "./globals.css";
import { CartContextProvider } from "@/context/CartContext";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "iDevStore",
  description: "The best store for electronics, gadgets and technology accessories. Find what you need and buy with confidence.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();
  return (
    <SessionProvider session={session} >
      <html lang="en">
        <body className={roboto.className} style={{ backgroundColor: "white" }}>
          <CartContextProvider>
            <Header />
            {children}
            <MainFooter />
          </CartContextProvider>
        </body>
      </html>
    </SessionProvider >
  );
};