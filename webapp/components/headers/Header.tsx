"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCart, BsPerson, BsSearch, } from "react-icons/bs";
import { Flex, Subtitle } from "@tremor/react";
import { ToggleMenu } from "@/components";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { LoginButton } from "../buttons/LoginButton";
import { useCurrentUserByClientSide } from "@/hooks/use-client-side-user";
import { UserButton } from "../buttons/UserButton";

export const Header = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      };

      const { cartProducts } = cartContext;

      const currentUser = useCurrentUserByClientSide();

      return (
            <Flex className="p-4 bg-slate-50 text-sm shadow-tremor-card fixed z-50">
                  <ToggleMenu />
                  <Link href={"/"} className="w-full flex items-center justify-center space-x-2">
                        <Image
                              alt="Logotipo iDevStore"
                              src={"/logo-dark.svg"}
                              width={26}
                              height={26}
                        />
                        <Subtitle className="desktop-only" >
                              iDevStore
                        </Subtitle>
                  </Link>
                  <nav className="w-full flex justify-end">
                        <ul className="flex items-center space-x-4">
                              <li>
                                    <Link href={"/search"} className="desktop-only">
                                          <div className="flex items-center space-x-2">
                                                <BsSearch size={16} />
                                                <span> Pesquisar </span>
                                          </div>
                                    </Link>
                              </li>
                              <li>
                                    <Link href={"/cart"}>
                                          <div className="flex items-center space-x-2">
                                                <BsCart size={16} />
                                                <span className="desktop-only"> Carrinho </span>
                                                ({cartProducts.length})
                                          </div>
                                    </Link>
                              </li>
                              {currentUser ? (
                                    <li>
                                          <UserButton />
                                    </li>
                              ) : (

                                    <LoginButton pageUrl="/settings">
                                          <li>
                                                <div className="flex items-center space-x-2">
                                                      <BsPerson size={20} />
                                                      <span className="desktop-only"> Conta </span>
                                                </div>
                                          </li>
                                    </LoginButton>
                              )}
                        </ul>
                  </nav >
            </Flex >
      );
};