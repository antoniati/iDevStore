"use client";

import { BsGithub } from "react-icons/bs";
import { Button, Flex, Metric, Title } from "@tremor/react";

export const HeroSection = () => {
      const openInNewTab = (url: string) => {
            window.open(url, "_blank", "noopener,noreferrer");
      };

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
                        <Button
                              icon={BsGithub}
                              variant="secondary"
                              onClick={() => openInNewTab("https://github.com/antoniati/iDevStore")}
                        >
                              Repo
                        </Button>
                  </Flex>
            </section>
      );
};