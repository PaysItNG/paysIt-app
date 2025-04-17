import AdminHeader from "@/components/core/admin/AdminHeader";
import SidebarHeader from "@/components/core/sidebar/SidebarHeader";
import AdminProvider from "@/components/providers/AdminProvider";
import ChildrenSection from "@/components/shared/ChildrenSection";
import Sidebar from "@/components/shared/Sidebar";
import clsx from "clsx";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProvider>
      <main className={clsx("flex w-screen max-w-full")}>
        <Sidebar role={"admin"} />

        <ChildrenSection header={<SidebarHeader role="admin" />}>
          {children}
        </ChildrenSection>
      </main>
    </AdminProvider>
  );
};

export default Layout;
