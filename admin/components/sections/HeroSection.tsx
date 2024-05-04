"use client";

import Link from "next/link";
import { Button, Flex, Metric, Title } from "@tremor/react";
import { LoginButton } from "../buttons/LoginButton";

export const HeroSection = () => {
      return (
            <section className="heroSection">
                  <Metric>
                        Everything you need to manage your store
                  </Metric>
                  <Title>
                        With an intuitive interface and advanced features, iDevStore lets you control every aspect of your store, from product management to sales tracking
                  </Title>
                  <Flex className="justify-center space-x-2 p-4">
                        <LoginButton>
                              <Button>
                                    Sign In
                              </Button>
                        </LoginButton>
                        <Button variant="secondary" >
                              <Link href={"/auth/register"}> Register </Link>
                        </Button>
                  </Flex>
            </section>
      );
};