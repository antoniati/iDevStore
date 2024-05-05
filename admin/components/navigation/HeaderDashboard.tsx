import Image from "next/image";
import { BsJustify } from "react-icons/bs";;
import { Button, Flex } from "@tremor/react";
import { LogoutButton } from "@/components";

type HeaderDashboardProps = {
      isAsideVisible: boolean;
      setIsAsideVisible: (isAsideVisible: boolean) => void;
};

export const HeaderDashboard = ({ isAsideVisible, setIsAsideVisible }: HeaderDashboardProps) => {
      return (
            <header>
                  <Flex>
                        <Flex className={`w-1/2 justify-start space-x-2 ${!isAsideVisible ? "w-72" : "hidden"}`} >
                              <Button
                                    className="text-slate-800 hover:bg-blue-50 rounded-tremor-full p-2 transition-all duration-300"
                                    variant="light"
                                    onClick={() => setIsAsideVisible(!isAsideVisible)}
                              >
                                    <BsJustify size={20} />
                              </Button>
                              <Image
                                    alt="Logotipo iDevStore"
                                    src={"/logo-dark.svg"}
                                    width={20}
                                    height={20}
                              />
                              <h2 className={"font-bold"}>
                                    iDevStore
                              </h2>
                        </Flex>
                        <Flex className="w-full justify-end">
                              <LogoutButton>
                                    Log Out
                              </LogoutButton>
                        </Flex>
                  </Flex>
            </header>
      );
};