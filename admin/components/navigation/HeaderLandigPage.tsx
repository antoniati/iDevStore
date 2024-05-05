"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsGithub, BsInfoCircle } from "react-icons/bs";
import { Button, Flex } from "@tremor/react";
import { cn } from "@/libs/tw-merge";
import { LoginButton } from "@/components";

export const HeaderLandigPage = () => {
      const pathname = usePathname();
      const isAuthPage = pathname?.startsWith('/auth');

      return (
            <header className={cn("mainContainer", "bg-white p-4 border-b-4 border-slate-100")}>
                  <Flex >
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

                        <Flex className="w-1/2 justify-end space-x-4">
                              <Flex className={"space-x-4 justify-end"}>
                                    <Link
                                          href={"/suporte"}
                                          className="flex items-center space-x-2 text-tremor-default"
                                    >
                                          <BsInfoCircle size={22} />
                                          <span className="desktop-only"> FAQ </span>
                                    </Link>
                                    <Link
                                          href={"https://github.com/antoniati/iDevStore"}
                                          className="flex items-center space-x-2 text-tremor-default"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                    >
                                          <BsGithub size={22} />
                                          <span className="desktop-only"> Repo </span>
                                    </Link>
                              </Flex>

                              <span
                                    style={{
                                          height: "40px",
                                          padding: "1px",
                                          backgroundColor: "#E2E8F0",
                                          borderRadius: "15%"
                                    }}
                              ></span>

                              {!isAuthPage && (
                                    <LoginButton pageUrl="/auth/login">
                                          <Button size="xs">
                                                Sign In
                                          </Button>
                                    </LoginButton>
                              )}
                        </Flex>
                  </Flex>
            </header>
      );
};