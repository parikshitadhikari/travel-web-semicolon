"use client";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../../src/components/ui/sidebar";
import {
  IconAi,
  IconAnalyze,
  IconArrowGuide,
  IconArrowLeft,
  IconBrandTabler,
  IconCalendarEvent,
  IconChartArcs,
  IconMoneybag,
  IconMountain,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SidebarDemo() {
  const [userData, setUserData] = useState<any>({
    username: "",
    email: "",
    password: "",
    interests: [],
    mood: "",
  });
  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    console.log(storedData);
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  const links = [
    {
      label: "Community",
      href: "/community-post", // Updated with a route
      icon: (
        <IconBrandTabler className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Destination",
      href: "/destination", // Updated with a route
      icon: (
        <IconMountain className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Events",
      href: "/event", // Updated with a route
      icon: (
        <IconCalendarEvent className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Travel AI",
      href: "/travelAI", // Updated with a route
      icon: (
        <IconAi className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Guide",
      href: "/guide", // Yet t0 update with a route
      icon: (
        <IconArrowGuide className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Traverce",
      href: "/traverce", // Yet to update with a route
      icon: (
        <IconMoneybag className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Financial Tracker",
      href: "/tracker", // Updated with a route
      icon: (
        <IconChartArcs className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/user", // Updated with a route
      icon: (
        <IconUserBolt className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/", // Updated with a route
      icon: (
        <IconArrowLeft className="text-neutral-200 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-screen w-[60px] hover:w-[260px] transition-width duration-300 ease-in-out bg-gray-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: userData?.username || "Traveler",
                  href: "#",
                  icon: (
                    <img
                      src={"/images/profile.png"}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
    </>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        TravelWeb
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
