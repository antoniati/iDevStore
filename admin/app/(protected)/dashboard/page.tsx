"use client";

import { useState } from "react";
import { AsideMenu, DashboardSection } from "@/components"

export default function Dashboard() {
  const [isAsideVisible, setIsAsideVisible] = useState(true);

  return (
    <main className="w-full flex justify-between" style={{ height: "100vh" }}>
      <AsideMenu
        isAsideVisible={isAsideVisible}
        setIsAsideVisible={setIsAsideVisible}
      />

      <DashboardSection
        isAsideVisible={isAsideVisible}
        setIsAsideVisible={setIsAsideVisible}
      />
    </main>
  )
}