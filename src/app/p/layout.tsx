import Sidebar from "@/components/shared/Sidebar";
import clsx from "clsx";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={clsx("flex w-screen max-w-full")}>
        <Sidebar />
        <section className={"w-full px-10 py-3 overflow-y-auto"}>
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
