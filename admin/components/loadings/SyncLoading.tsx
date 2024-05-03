import { SyncLoader } from "react-spinners";
import { Flex } from "@tremor/react";

export const SyncLoading = () => {
      return (
            <Flex className="w-full items-center justify-center p-2 mt-2">
                  <SyncLoader size={12} color={"#3B82F6"} />
            </Flex>
      );
};