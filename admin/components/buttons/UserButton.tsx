"use client";

import React, { Fragment } from "react"
import { FaUser } from "react-icons/fa"
import { Menu, Transition } from "@headlessui/react"
import { useCurrentUserByClientSide } from "@/hooks/use-client-side-user";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { Flex } from "@tremor/react";
import { BsBoxArrowLeft, BsPersonGear } from "react-icons/bs";

export const UserButton = () => {
      const currentUser = useCurrentUserByClientSide();

      return (
            <Menu as="div" className="relative inline-block z-20">
                  <div>
                        <Menu.Button >
                              <div className="flex items-center justify-center border rounded-tremor-full border-blue-400 shadow-tremor-card" style={{ width: "50px", height: "50px" }}>
                                    {currentUser && currentUser.image ? (
                                          <Image
                                                alt=""
                                                src={currentUser.image}
                                                width={100}
                                                height={100}
                                          />
                                    ) : (
                                          <FaUser size={22} className="text-blue-500" />
                                    )}
                              </div>
                        </Menu.Button>
                  </div>
                  <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                  >
                        <Menu.Items className="absolute right-0 mt-4 rounded-tremor-default bg-white shadow-lg ring-1 ring-black focus:outline-none" >
                              <Flex className="flex-col items-start space-y-4 divide-y divide-gray-400" style={{ width: "200px" }}>
                                    <Link href={"/account"} className="w-full ">
                                          <Menu.Item>
                                                <Flex className="justify-start items-center space-x-4 p-4 hover:bg-blue-50">
                                                      <BsPersonGear size={20} />
                                                      <span> Settings </span>
                                                </Flex>
                                          </Menu.Item>
                                    </Link>
                                    <Menu.Item>
                                          <LogoutButton>
                                                <Menu.Item>
                                                      <Flex className="justify-start items-center space-x-4 p-4 hover:bg-blue-50">
                                                            <BsBoxArrowLeft size={20} />
                                                            <span> Log Out </span>
                                                      </Flex>
                                                </Menu.Item>
                                          </LogoutButton>
                                    </Menu.Item>
                              </Flex>
                        </Menu.Items>
                  </Transition>
            </Menu>
      );
};