"use client";

import { Card, Divider } from "@tremor/react";
import { AsideMenu, HeaderSections } from "@/components";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  // Controla a visibilidade do aside
  const [isAsideVisible, setIsAsideVisible] = useState(true);

  // useMediaQuery para saber se a tela é menor que 600px
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  // Atualiza a visibilidade do aside com base no tamanho da tela
  useEffect(() => {
    setIsAsideVisible(!isMobile);
  }, [isMobile]);

  return (
    <main className="w-full flex justify-between" style={{ height: "100vh" }}>
      <AsideMenu
        isAsideVisible={isAsideVisible}
        setIsAsideVisible={setIsAsideVisible}
        isMobile={isMobile}
      />
      <div className="w-full p-2">
        <Card className="h-full">
          <HeaderSections
            isAsideVisible={isAsideVisible}
            setIsAsideVisible={setIsAsideVisible}
          />
          <Divider />
          {children}
        </Card>
      </div>
    </main>
  );
};