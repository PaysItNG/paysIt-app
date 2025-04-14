import Sidebar from "@/components/shared/Sidebar";
import clsx from "clsx";
import AuthProvider from "@/components/providers/AuthProvider";
import ChildrenSection from "@/components/shared/ChildrenSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <main className={clsx("flex w-screen max-w-full")}>
          <Sidebar />
          <ChildrenSection>{children}</ChildrenSection>
        </main>
      </AuthProvider>
    </>
  );
};

export default Layout;
