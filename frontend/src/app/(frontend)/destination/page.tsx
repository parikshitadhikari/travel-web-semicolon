import NavBar from "@/app/components/NavBar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";
import Recommended from "./components/Recommended";
import Trending from "./components/Trending";
import LowBudget from "./components/LowBudget";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import SidebarDemo from "@/app/components/Sidebar";

const Itenaries = () => {
  return (
    <MantineProvider>
      <div className="relative min-h-screen bg-white">
        <div className="absolute inset-0 z-0">
          <BackgroundBeams />
        </div>

        {/* <NavBar /> */}
        <div className="z-50 relative">
          <SidebarDemo />
        </div>

        <div className="flex flex-col items-center justify-center pt-10 space-y-4 -z-10">
          <Recommended />
          <Trending />
          <LowBudget />
        </div>
      </div>
    </MantineProvider>
  );
};

export default Itenaries;