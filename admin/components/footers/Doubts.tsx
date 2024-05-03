import { BsArrowRight } from "react-icons/bs";
import { Button, Divider, Flex, Text, Title } from "@tremor/react";
import Link from "next/link";

export const Doubts = () => {
      return (
            <Flex className="flex-col items-start space-y-4 max-w-lg">
                  <Divider />
                  <Title>Do you have questions?</Title>
                  <Text className="leading-9">
                        You can find asked questions and answers on our
                        <Link href={"/"} className="text-blue-500 ml-1">
                              FAQ page.
                        </Link>
                  </Text>
            </Flex>
      );
};