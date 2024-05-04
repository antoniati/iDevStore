"use server";

import { signOut } from "@/auth";

export const logoutSession = async () => {
      await signOut();
};