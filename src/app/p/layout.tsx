import Sidebar from "@/components/shared/Sidebar";
import clsx from "clsx";
import AuthProvider from "@/components/providers/AuthProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <main className={clsx("flex w-screen max-w-full")}>
          <Sidebar />
          <section className={"w-full px-10 py-3 overflow-y-auto"}>
            {children}
          </section>
        </main>
      </AuthProvider>
    </>
  );
};

export default Layout;
