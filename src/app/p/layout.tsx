import Sidebar from "@/components/shared/Sidebar";
import clsx from "clsx";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={clsx("flex gap-x-3")}>
        <Sidebar />
        <section>{children}</section>
      </main>
    </>
  );
};

export default Layout;
