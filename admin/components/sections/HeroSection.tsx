"use client";

import { useState } from "react";
import { Button, Flex, Metric, Title } from "@tremor/react";
import { BeatLoading, LoginButton } from "@/components";

export const HeroSection = () => {
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const handleLoadingPage = () => setIsLoadingPage(true);

      return (
            <section className="hero-section">
                  <Metric>
                        Everything you need to manage your store
                  </Metric>
                  <Title>
                        With an intuitive interface and advanced features, iDevStore lets you control every aspect of your store, from product management to sales tracking
                  </Title>

                  {!isLoadingPage ? (
                        <Flex className="justify-center space-x-2 p-4">
                              <LoginButton pageUrl={"/auth/login"}>
                                    <Button
                                          type="button"
                                          onClick={handleLoadingPage}
                                    >
                                          Sign In
                                    </Button>
                              </LoginButton>
                              <LoginButton pageUrl={"/auth/register"}>
                                    <Button
                                          type="button"
                                          variant="secondary"
                                          onClick={handleLoadingPage}
                                    >
                                          Register
                                    </Button>
                              </LoginButton>
                        </Flex>
                  ) : (
                        <BeatLoading />
                  )}
            </section>
      );
};