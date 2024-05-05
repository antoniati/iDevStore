import Link from "next/link";
import { IconType } from "react-icons";
import { BsArrowUpRight, BsBoxSeam, BsClipboardData, BsLayers } from "react-icons/bs";
import { Card, Divider, Flex, Grid, Title } from "@tremor/react";
import { HeaderDashboard } from "@/components";

interface gridDashDataProps {
      icon: IconType;
      title: string;
      pageUrl: string;
      quantity: number;
};

const gridDashData: gridDashDataProps[] = [
      {
            icon: BsBoxSeam,
            title: "Products",
            pageUrl: "Products",
            quantity: 0,
      },
      {
            icon: BsClipboardData,
            title: "Orders",
            pageUrl: "/orders",
            quantity: 0,
      },
      {
            icon: BsLayers,
            title: "Category",
            pageUrl: "/category",
            quantity: 0,
      },
];

type DashboardSectionProps = {
      isAsideVisible: boolean;
      setIsAsideVisible: (isAsideVisible: boolean) => void;
};

export const DashboardSection = ({ isAsideVisible, setIsAsideVisible }: DashboardSectionProps) => {
      return (
            <section className="w-full p-4">
                  <Card className="h-full">
                        <HeaderDashboard
                              isAsideVisible={isAsideVisible}
                              setIsAsideVisible={setIsAsideVisible}
                        />

                        <Divider />

                        <Grid numItems={1} numItemsMd={2} numItemsLg={3} style={{ gap: "20px" }}>
                              {gridDashData.map((gridData, index) => (
                                    <Link key={index} href={`${gridData.pageUrl}`}>
                                          <Card className="space-y-4">
                                                <Flex className="justify-start space-x-2">
                                                      <gridData.icon size={20} />
                                                      <Title>{gridData.title}</Title>
                                                </Flex>
                                                <div className="mt-6 grid grid-cols-3 divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border">
                                                      <div className="truncate px-3 py-2 space-y-1">
                                                            <p className="truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                                                  Quantity
                                                            </p>
                                                            <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                                  {gridData.quantity}
                                                            </p>
                                                      </div>
                                                </div>
                                                <BsArrowUpRight className="text-slate-500 absolute top-0 right-0 mr-4" />
                                          </Card>
                                    </Link>
                              ))}
                        </Grid>
                  </Card>
            </section>
      );
};