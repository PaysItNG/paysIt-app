"use client";
import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

const SidebarSwitch = () => {
  const { data, switchSidebar } = useManageSidebar();
  const { sideBarOpen } = data;

  return (
    <div
      className={clsx(
        "absolute -right-5 top-1/2 h-14 w-5 cursor-pointer bg-gradient-to-b from-green-700 before:to-green-700 rounded-r-small flex items-center justify-center transition-all"
      )}
      onClick={switchSidebar}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sideBarOpen ? "open" : "close"}
          initial={{ opacity: 0, x: sideBarOpen ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: sideBarOpen ? -10 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {React.createElement(
            sideBarOpen ? IoChevronBackOutline : IoChevronForwardOutline,
            {
              size: 20,
              color: "white",
            }
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SidebarSwitch;
