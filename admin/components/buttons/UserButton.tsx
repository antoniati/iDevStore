"use client";

import Link from "next/link";
import { Fragment } from "react";
import { BsBoxArrowLeft, BsChevronDown, BsChevronUp, BsPersonGear } from "react-icons/bs";
import { Flex } from "@tremor/react";
import { Menu, Transition } from "@headlessui/react";
import { LogoutButton } from "@/components";
import { useCurrentUserByClientSide } from "@/hooks/use-client-side-user";

export const UserButton = () => {
      const currentUser = useCurrentUserByClientSide();

      return (
            <Menu as="div" className="relative inline-block z-20">
                  {({ open }) => (
                        <>
                              <div>
                                    <Menu.Button>
                                          <Flex className="justfy-start spce-x-4">
                                                <img
                                                      alt="Profile"
                                                      src={currentUser?.image ?? "/unknow-profile-image.png"}
                                                      className={`cover rounded-tremor-full border-2 ${open ? 'border-blue-500' : 'border-slate-600'} `}
                                                      style={{ width: "50px", height: "50px" }}
                                                />
                                                <span className="p-2">
                                                      {open ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                                                </span>
                                          </Flex>
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
                                    <Menu.Items
                                          className="absolute right-0 rounded-tremor-default bg-white shadow-lg ring-1 ring-black focus:outline-none"
                                    >
                                          <Flex
                                                className="flex-col items-start space-y-4 divide-y divide-gray-400"
                                                style={{ width: "200px" }}
                                          >
                                                <Link href={`/settings/${currentUser?.id}`} className="w-full">
                                                      <Menu.Item>
                                                            <Flex className="justify-start items-center space-x-4 p-4 hover:bg-blue-50">
                                                                  <BsPersonGear size={20} />
                                                                  <span>Settings</span>
                                                            </Flex>
                                                      </Menu.Item>
                                                </Link>
                                                <Menu.Item>
                                                      <LogoutButton>
                                                            <Flex className="justify-start items-center space-x-4 p-4 hover:bg-blue-50">
                                                                  <BsBoxArrowLeft size={20} />
                                                                  <span>Log Out</span>
                                                            </Flex>
                                                      </LogoutButton>
                                                </Menu.Item>
                                          </Flex>
                                    </Menu.Items>
                              </Transition>
                        </>
                  )}
            </Menu>
      );
};
