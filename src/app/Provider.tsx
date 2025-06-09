"use client";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import HeroProvider from "@/components/providers/HeroUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import GeneralProtectedProvider from "@/components/providers/GeneralProtectedProvider";
import DrawerProvider from "@/components/providers/DrawerProvider";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <HeroProvider>
        <GeneralProtectedProvider>
          <SessionProvider>{children}</SessionProvider>
        </GeneralProtectedProvider>
        <DrawerProvider />
      </HeroProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
    </ReactQueryProvider>
  );
};
