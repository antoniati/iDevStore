"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/actions/read/get-users";
import { User } from "@prisma/client";

export const useUserDataById = (userId: string) => {
      const [user, setUser] = useState<User | null>(null);

      const handleFetchUserById = async () => {
            const userFound = await getUserById(userId);

            if (userFound) {
                  setUser(userFound);
            };
      };

      useEffect(() => {
            handleFetchUserById();
      }, []);

      return { user, handleFetchUserById };
};