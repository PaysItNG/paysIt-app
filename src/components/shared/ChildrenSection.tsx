"use client";
import useScreenSize from "@/hooks/use-screen-size";
import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const ChildrenSection = ({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const { data, switchSidebar } = useManageSidebar();
  const { sideBarOpen } = data;

  const { isSmallScreen, isMediumScreen } = useScreenSize();

  const backdropVariants = {
    open: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className={clsx(
        "w-full flex-1 relative",
        sideBarOpen ? "lg:ml-64" : "lg:ml-16"
      )}
    >
      <div className="w-full sticky top-0 z-40">{header}</div>
      <section
        className={clsx(
          "w-full px-6 py-3 pt-8 min-h-screen",
          !sideBarOpen && "pl-6 lg:pl-10"
        )}
      >
        {/* Backdrop for mobile */}
        <AnimatePresence>
          {sideBarOpen && (isSmallScreen || isMediumScreen) && (
            <motion.div
              key="backdrop"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              className="fixed inset-0 top-[3.6rem] z-30 bg-black bg-opacity-50 lg:hidden"
              onClick={switchSidebar}
            />
          )}
        </AnimatePresence>

        {children}
      </section>
    </div>
  );
};

export default ChildrenSection;
