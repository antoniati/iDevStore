"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBoxSeam, BsChevronCompactLeft, BsClipboardData, BsGrid, BsLayers } from "react-icons/bs";
import { Button, Flex } from "@tremor/react";
import { AsideProps, NavigationProps } from "@/types";

const navAside: NavigationProps[] = [
      {
            icon: BsGrid,
            title: "Dashboard",
            pageUrl: "/dashboard"
      },
      {
            icon: BsBoxSeam,
            title: "Products",
            pageUrl: "/products"
      },
      {
            icon: BsClipboardData,
            title: "Orders",
            pageUrl: "/orders"
      },
      {
            icon: BsLayers,
            title: "Category",
            pageUrl: "/category"
      },
];

export const AsideMenu = ({ isAsideVisible, setIsAsideVisible, isMobile }: AsideProps) => {
      const pathname = usePathname();

      // Estilos para o aside fixo em telas menores que 600px
      const asideStyle = isMobile ? {
            position: "fixed" as const,
            top: 0,
            left: isAsideVisible ? 0 : "-300px",
            height: "100vh",
            width: "300px",
            transition: "left 0.3s ease-in-out",
            zIndex: 20,
      } : {
            height: "100vh",
            width: "300px",
      };

      return (
            <aside
                  className={`${isAsideVisible ? "h-full p-4 bg-white overflow-auto" : "hidden"}`}
                  style={asideStyle}
            >
                  <Flex className="p-4">
                        <Link href={"/"}>
                              <Flex className="w-1/2 justify-start space-x-2">
                                    <Image
                                          alt="Logotipo iDevStore"
                                          src={"/logo-dark.svg"}
                                          width={26}
                                          height={26}
                                    />
                                    <h2 className={"font-bold"}>iDevStore</h2>
                              </Flex>
                        </Link>

                        <Button
                              className="text-slate-800 hover:bg-blue-50 rounded-tremor-full p-2 hover:text-slate-800 transition-all duration-300"
                              variant="light"
                              onClick={() => setIsAsideVisible(!isAsideVisible)}
                        >
                              <BsChevronCompactLeft size={20} />
                        </Button>
                  </Flex>

                  {isAsideVisible && (
                        <nav className="h-full" style={{ paddingTop: "40px" }}>
                              <ul className="flex-col space-y-1">
                                    {navAside.map((item, index) => {
                                          const isActive = pathname === item.pageUrl;
                                          const buttonClasses = isActive
                                                ? "justify-start rounded-tremor-default w-full p-4 bg-blue-50 hover:text-slate-800 text-slate-800 font-bold"
                                                : "justify-start rounded-tremor-default w-full p-4 hover:bg-blue-50 text-slate-800 hover:text-slate-800";

                                          return (
                                                <li key={index}>
                                                      <Link href={item.pageUrl}>
                                                            <Button
                                                                  icon={item.icon}
                                                                  variant="light"
                                                                  className={buttonClasses}
                                                            >
                                                                  {item.title}
                                                            </Button>
                                                      </Link>
                                                </li>
                                          );
                                    })}
                              </ul>
                        </nav>
                  )}

                  <footer className="bg-white border-t-4 border-slate-100">
                        <Flex className="flex-col p-6" style={{ gap: "20px" }}>
                              <h4 className="text-tremor-label flex items-center">
                                    &#169; - iDevStore, All Rights Reserved. Developed in Brazil
                              </h4>
                              <p className="text-tremor-label font-medium">
                                    Made by:
                                    <Link href="/" className="ml-2">
                                          Antoniati
                                    </Link>
                              </p>
                        </Flex>
                  </footer>
            </aside>
      );
};