"use client";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import HeroProvider from "@/components/providers/HeroUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      {/* <AuthProvider> */}
      <HeroProvider>{children}</HeroProvider>
      {/* </AuthProvider> */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
    </ReactQueryProvider>
  );
};
