import Image from "next/image";
import { BsJustify } from "react-icons/bs";;
import { Button, Flex } from "@tremor/react";
import { LogoutButton } from "@/components";
import { AsideProps } from "@/types";

export const HeaderSections = ({ isAsideVisible, setIsAsideVisible }: AsideProps) => {
      return (
            <header>
                  <Flex>
                        <Flex className={`${!isAsideVisible ? "w-1/2 justify-start space-x-2" : "hidden"}`} >
                              <Button
                                    className="text-slate-800 hover:text-slate-800 hover:bg-blue-50 rounded-tremor-full p-2 transition-all duration-300"
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