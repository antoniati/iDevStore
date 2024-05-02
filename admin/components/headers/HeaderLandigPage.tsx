import { Button, Flex } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsInfoCircle } from "react-icons/bs";

export const HeaderLandigPage = () => {
      return (
            <header className="w-full shadow-tremor-card p-4">
                  <Flex>
                        <Flex className="w-1/2 justify-start space-x-2">
                              <Image
                                    alt="Logotipo iDevStore"
                                    src={"/logo-dark.svg"}
                                    width={26}
                                    height={26}
                              />
                              <h2 className="font-bold">iDevStore</h2>
                        </Flex>

                        <Flex className="w-1/2 space-x-6">
                              <Flex className="space-x-4 justify-end">
                                    <Link
                                          href={"/suporte"}
                                          className="flex items-center space-x-2 text-tremor-default"
                                    >
                                          <BsInfoCircle size={22} />
                                          <span className="desktop-only">
                                                FAQ
                                          </span>
                                    </Link>
                                    <Link
                                          href={"https://github.com/antoniati/iDevStore"}
                                          className="flex items-center space-x-2 text-tremor-default"
                                    >
                                          <BsGithub size={22} />
                                          <span className="desktop-only">
                                                Repositorio
                                          </span>
                                    </Link>
                              </Flex>

                              <span style={{
                                    height: "40px",
                                    padding: "2px",
                                    backgroundColor: "#E2E8F0",
                                    borderRadius: "15%"
                              }}></span>

                              <Button>
                                    Faça o Login
                              </Button>
                        </Flex>
                  </Flex>
            </header>
      );
};