"use client";

import { BsGithub } from "react-icons/bs";
import { Button, Flex, Metric, Title } from "@tremor/react";
import Link from "next/link";

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
                        <Button>
                              Sign In
                        </Button>
                        <Button variant="secondary" >
                              <Link href={"/auth/register"}> Register </Link>
                        </Button>
                  </Flex>
            </section>
      );
};