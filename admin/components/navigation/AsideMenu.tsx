import Image from "next/image";
import Link from "next/link";
import { Button, Flex } from "@tremor/react";
import { BsBoxSeam, BsChevronCompactLeft, BsClipboardData, BsGrid, BsLayers } from "react-icons/bs";

interface asideMenuProps {
      icon: React.ElementType;
      title: string;
      pageUrl: string;
}

const asideNavigationData: asideMenuProps[] = [
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

type Props = {
      isAsideVisible: boolean
      setIsAsideVisible: (isAsideVisible: boolean) => void;
}

export const AsideMenu = ({ isAsideVisible, setIsAsideVisible }: Props) => {
      return (
            <aside className={`h-full justify-between p-4 bg-white overflow-auto ${isAsideVisible ? "w-72 sm:w-0" : "hidden"}`}>
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
                              className="text-slate-800 hover:bg-blue-50 rounded-tremor-full p-2 transition-all duration-300"
                              variant="light"
                              onClick={() => setIsAsideVisible(!isAsideVisible)}
                        >
                              <BsChevronCompactLeft size={20} />
                        </Button>
                  </Flex>

                  {isAsideVisible && (
                        <nav className="h-full" style={{ paddingTop: "40px" }}>
                              <ul className="flex-col">
                                    {asideNavigationData.map((asideData, index) => (
                                          <li key={index} className="p-4">
                                                <Button icon={asideData.icon} variant="light" className="text-slate-800">
                                                      <Link href={`${asideData.pageUrl}`}>
                                                            {asideData.title}
                                                      </Link>
                                                </Button>
                                          </li>
                                    ))}
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