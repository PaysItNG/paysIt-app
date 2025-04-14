"use client";
import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import React from "react";

const ChildrenSection = ({ children }: { children: React.ReactNode }) => {
  const { data } = useManageSidebar();
  const { sideBarOpen } = data;
  return (
    <section
      className={clsx(
        "w-full px-10 py-3 overflow-y-auto overflow-x-hidden min-h-screen",
        !sideBarOpen && "pl-24 md:pl-10"
      )}
    >
      {children}
    </section>
  );
};

export default ChildrenSection;
