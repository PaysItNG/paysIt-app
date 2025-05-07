"use client";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import HeroProvider from "@/components/providers/HeroUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import GeneralProtectedProvider from "@/components/providers/GeneralProtectedProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <HeroProvider>
        <GeneralProtectedProvider>{children}</GeneralProtectedProvider>
      </HeroProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
    </ReactQueryProvider>
  );
};
