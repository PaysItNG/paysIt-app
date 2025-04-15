"use client";
import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import React from "react";

const ChildrenSection = ({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const { data } = useManageSidebar();
  const { sideBarOpen } = data;
  return (
    <main className={clsx("w-full", sideBarOpen ? "ml-64" : "ml-16")}>
      <div className="w-full">{header}</div>
      <section
        className={clsx(
          "w-full px-10 py-3 overflow-y-auto overflow-x-hidden min-h-screen",
          !sideBarOpen && "pl-24 md:pl-10"
        )}
      >
        {children}
      </section>
    </main>
  );
};

export default ChildrenSection;
