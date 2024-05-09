import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header, MainFooter } from "@/components";
import "./globals.css";
import { CartContextProvider } from "@/context/CartContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "iDevStore",
  description: "The best store for electronics, gadgets and technology accessories. Find what you need and buy with confidence.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={roboto.className} style={{ backgroundColor: "white" }}>
        <CartContextProvider>
          <Header />
          {children}
          <MainFooter />
        </CartContextProvider>
      </body>
    </html>
  );
};