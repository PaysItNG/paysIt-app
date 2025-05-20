"use client";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import HeroProvider from "@/components/providers/HeroUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import GeneralProtectedProvider from "@/components/providers/GeneralProtectedProvider";
import DrawerProvider from "@/components/providers/DrawerProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <HeroProvider>
        <GeneralProtectedProvider>{children}</GeneralProtectedProvider>
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
