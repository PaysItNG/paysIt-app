"use client";
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
  return (
    <main className={clsx("w-full", sideBarOpen ? "lg:ml-64" : "lg:ml-16")}>
      <div className="w-full">{header}</div>
      <section
        className={clsx(
          "w-full px-10 py-3 pt-8 overflow-y-auto overflow-x-hidden min-h-screen",
          !sideBarOpen && "pl-6 lg:pl-10"
        )}
      >
        {/* Backdrop for mobile */}
        <AnimatePresence>
          {sideBarOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[3.6rem] inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
              onClick={switchSidebar}
            />
          )}
        </AnimatePresence>

        {children}
      </section>
    </main>
  );
};

export default ChildrenSection;
