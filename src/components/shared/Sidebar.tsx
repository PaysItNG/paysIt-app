"use client";
import clsx from "clsx";
import React from "react";
import MenuLink from "../core/sidebar/MenuLink";
import SidebarSwitch from "../core/sidebar/SidebarSwitch";
import {
  adminBottomMenus,
  adminTopMenus,
  bottomMenus,
  MenuType,
  topMenus,
} from "@/lib/utils/sidebarMenus";
import LogoNameHeader from "../core/sidebar/LogoNameHeader";
import useManageSidebar from "@/hooks/useManageSidebar";
import { AnimatePresence, motion } from "framer-motion";

type PropType = {
  topMenus?: MenuType[];
  bottomMenus?: MenuType[];
  role?: string;
};

const Sidebar: React.FC<PropType> = ({ role }) => {
  const { data } = useManageSidebar();
  const { sideBarOpen } = data;

  const topMenuItems = role === "admin" ? adminTopMenus : topMenus;
  const bottomMenuItems = role === "admin" ? adminBottomMenus : bottomMenus;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key="sidebar"
          initial={{ opacity: 0, x: -50 }} // Start off-screen
          animate={{ opacity: 1, x: 0 }} // Animate to visible
          exit={{ opacity: 0, x: -50 }} // Exit animation
          transition={{ duration: 0.3 }}
          className={clsx(
            "bg-[#f1f1f1] min-h-screen rounded-r-2xl fixed md:relative transition-all z-20",
            sideBarOpen ? "w-64" : "w-16"
          )}
        >
          <SidebarSwitch />

          <div className="pt-8 pb-5 flex flex-col justify-between h-full">
            <div className="space-y-10">
              <LogoNameHeader sideBarOpen={sideBarOpen} />
              <div>
                <div
                  className={clsx("space-y-5", sideBarOpen ? "md:mx-4" : "")}
                >
                  {topMenuItems.map((menu, index) => (
                    <MenuLink key={index + "____top_menu"} menu={menu} />
                  ))}
                </div>
              </div>
            </div>
            <div className={clsx("space-y-5", sideBarOpen ? "md:mx-4" : "")}>
              {bottomMenuItems.map((menu, index) => (
                <MenuLink key={index + "____bottom_menu"} menu={menu} />
              ))}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
