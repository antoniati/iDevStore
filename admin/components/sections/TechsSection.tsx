"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, Divider, Grid, Subtitle } from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { techIcons } from "@/utils/tech-icons-data";
import { TechIconProps } from "@/types";
import { cn } from "@/libs/tw-merge";

export default function TechSections() {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [selectedIcon, setSelectedIcon] = useState<TechIconProps | null>(null);

      const handleOpenModal = (icon: TechIconProps | null = null) => {
            setSelectedIcon(icon);
            setIsOpen(!isOpen);
      };

      return (
            <section className="techSection">
                  <div className="mainContainer">
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
                                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                <Transition.Child
                                                      as={Fragment}
                                                      enter="ease-out duration-300"
                                                      enterFrom="opacity-0 scale-95"
                                                      enterTo="opacity-100 scale-100"
                                                      leave="ease-in duration-200"
                                                      leaveFrom="opacity-100 scale-100"
                                                      leaveTo="opacity-0 scale-95"
                                                >
                                                      <Dialog.Panel
                                                            className="w-full max-w-md transform overflow-hidden border-2 border-slate-200 rounded-tremor-default p-6 text-left align-middle shadow-xl transition-all bg-white"
                                                      >
                                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-800" >
                                                                  <div className="flex items-center space-x-2">
                                                                        <img
                                                                              alt={selectedIcon ? selectedIcon?.name : "Logotipo iDevStore"}
                                                                              src={selectedIcon ? selectedIcon.iconUrl : "/logo-dark.svg"}
                                                                              className="w-4 object-cover"
                                                                        />
                                                                        <h2 className="text-tremor-title">
                                                                              {selectedIcon ? selectedIcon.name : "iDevStore"}
                                                                        </h2>
                                                                  </div>
                                                            </Dialog.Title>

                                                            <div className="mt-2">
                                                                  <p className="text-tremor-title text-slate-600">
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

                                                                  </p>
                                                            </div>

                                                            <div className="mt-4">
                                                                  <Button
                                                                        size="lg"
                                                                        type="button"
                                                                        onClick={() => handleOpenModal(null)}
                                                                  >
                                                                        Close
                                                                  </Button>
                                                            </div>
                                                      </Dialog.Panel>
                                                </Transition.Child>
                                          </div>
                                    </div>
                              </Dialog>
                        </Transition>
                  </div>
            </section >
      );
};