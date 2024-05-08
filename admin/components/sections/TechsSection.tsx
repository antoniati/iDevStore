"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, Divider, Flex, Grid, Subtitle, Text } from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { techIcons } from "@/utils/tech-icons-data";
import { TechIconProps } from "@/types";

export const TechSections = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [selectedIcon, setSelectedIcon] = useState<TechIconProps | null>(null);

      const handleOpenModal = (icon: TechIconProps | null = null) => {
            setSelectedIcon(icon);
            setIsOpen(!isOpen);
      };

      return (
            <section className="tech-section">
                  <div className="landing-container">
                        <Subtitle className="w-full text-center">
                              Created with the most modern technologies:
                        </Subtitle>

                        <Divider />

                        <Grid numItems={4} numItemsMd={6} numItemsLg={11} className="w-full">
                              {techIcons.map((icon, index) => (
                                    <Button
                                          key={index}
                                          type="button"
                                          variant="light"
                                          onClick={() => handleOpenModal(icon)}
                                    >
                                          <div className="p-4 flex items-center justify-center" >
                                                <img
                                                      alt={icon.name}
                                                      src={icon.iconUrl}
                                                      className="object-cover w-10"
                                                />
                                          </div>
                                    </Button>
                              ))}
                        </Grid>

                        <Transition appear show={isOpen} as={Fragment}>
                              <Dialog
                                    as="div"
                                    className="relative z-10"
                                    onClose={() => handleOpenModal(null)}
                              >
                                    <Transition.Child
                                          as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0"
                                          enterTo="opacity-100"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0"
                                    >
                                          <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                                          <Flex className="min-h-full p-4 text-center">
                                                <Transition.Child
                                                      as={Fragment}
                                                      enter="ease-out duration-300"
                                                      enterFrom="opacity-0 scale-95"
                                                      enterTo="opacity-100 scale-100"
                                                      leave="ease-in duration-200"
                                                      leaveFrom="opacity-100 scale-100"
                                                      leaveTo="opacity-0 scale-95"
                                                >
                                                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden border-2 border-slate-200 rounded-tremor-default p-6 text-left align-middle shadow-xl transition-all bg-white" >
                                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-800" >
                                                                  <Flex className="justify-start space-x-2">
                                                                        <img
                                                                              alt={selectedIcon ? selectedIcon?.name : "Logotipo iDevStore"}
                                                                              src={selectedIcon ? selectedIcon.iconUrl : "/logo-dark.svg"}
                                                                              style={{ width: "22px" }}
                                                                        />
                                                                        <Subtitle className="text-tremor-title">
                                                                              {selectedIcon ? selectedIcon.name : "iDevStore"}
                                                                        </Subtitle>
                                                                  </Flex>
                                                            </Dialog.Title>

                                                            <Text className="text-tremor-title text-slate-600 mt-2">
                                                                  {selectedIcon ? (
                                                                        <>
                                                                              {selectedIcon.description}
                                                                              <Link
                                                                                    href={selectedIcon ? selectedIcon.documentationUrl : "/"}
                                                                                    className="text-blue-500 ml-1"
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                              >
                                                                                    See the documentation for more information
                                                                              </Link>
                                                                        </>
                                                                  ) : ""}
                                                            </Text>

                                                            <Button
                                                                  size="lg"
                                                                  type="button"
                                                                  onClick={() => handleOpenModal(null)}
                                                                  className="mt-4"
                                                            >
                                                                  Close
                                                            </Button>
                                                      </Dialog.Panel>
                                                </Transition.Child>
                                          </Flex>
                                    </div>
                              </Dialog>
                        </Transition>
                  </div>
            </section >
      );
};