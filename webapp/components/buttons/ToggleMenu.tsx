"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { BsCart, BsList, BsSearch, BsShop, BsBag, BsQuestionCircle, BsLayers, } from "react-icons/bs";
import { Button } from "@tremor/react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";

export const ToggleMenu = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const router = useRouter();

      const closeMenu = (pageUrl: string) => {
            setIsOpen(false);
            router.push(pageUrl);
      };

      const menuItemData = [
            {
                  icon: BsShop,
                  title: "Store",
                  url: "/",
            },
            {
                  icon: BsCart,
                  title: "Cart",
                  url: "/cart",
            },
            {
                  icon: BsBag,
                  title: "Products",
                  url: "/products/all-products",
            },
            {
                  icon: BsSearch,
                  title: "Search",
                  url: "/search",
            },
            {
                  icon: BsLayers,
                  title: "Categories",
                  url: "/categories",
            },
            {
                  icon: BsQuestionCircle,
                  title: "Help",
                  url: "/help",
            },
      ];

      return (
            <Menu as="div" className="relative inline-block text-right w-full">
                  <div style={{ width: "50px" }} className="flex items-start justify-start">
                        <MenuButton onClick={() => setIsOpen(!isOpen)}>
                              <div className="flex items-center space-x-2">
                                    <BsList size={20} />
                                    <div className="textResponsive">Menu</div>
                              </div>
                        </MenuButton>
                  </div>
                  <Transition
                        show={isOpen}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                  >
                        <MenuItems className="absolute -left-1 mt-4 origin-top-left z-20" >
                              <div style={{ width: "280px" }} className="bg-slate-50 divide-y divide-gray-100 rounded-tremor-default shadow-lg border-2 focus:outline-none flex flex-col items-start">
                                    {menuItemData.map((menuItem, index) => (
                                          <Button
                                                className="w-full p-4 items-center justify-start hover:bg-blue-50 transition-all duration-300 text-slate-800"
                                                key={index}
                                                icon={menuItem.icon}
                                                type="button"
                                                variant="light"
                                                onClick={() => closeMenu(menuItem.url)}
                                          >
                                                <MenuItem>
                                                      <div className="ml-2">
                                                            {menuItem.title}
                                                      </div>
                                                </MenuItem>
                                          </Button>
                                    ))}
                              </div>
                        </MenuItems>
                  </Transition>
            </Menu >
      );
};