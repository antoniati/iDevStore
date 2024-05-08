"use client";

import Link from "next/link";
import { Flex } from "@tremor/react";

export const MainFooter = () => {
      return (
            <footer className="bg-white border-t-4 border-slate-100">
                  <div className="landing-container">
                        <Flex className="flex-col sm:flex-row p-6" style={{ gap: "20px" }}>
                              <h4 className="text-tremor-label flex items-center">
                                    &#169; - iDevStore, All Rights Reserved. Developed in Brazil
                              </h4>
                              <p className="text-tremor-label font-medium">
                                    Made by:
                                    <Link href="/" className="ml-2">
                                          Antoniati
                                    </Link>
                              </p>
                        </Flex>
                  </div>
            </footer>
      );
};