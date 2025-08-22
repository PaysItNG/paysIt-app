"use client";
import { Toaster } from "react-hot-toast";
import { ReactNode, useEffect } from "react";
import HeroProvider from "@/components/providers/HeroUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import GeneralProtectedProvider from "@/components/providers/GeneralProtectedProvider";
import DrawerProvider from "@/components/providers/DrawerProvider";
import { SessionProvider } from "next-auth/react";
import StripeProvider from "@/components/providers/StripeProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      const isChunkError =
        event.message?.includes("ChunkLoadError") ||
        event.message?.includes("Loading chunk") ||
        event?.error?.name === "ChunkLoadError";

      if (isChunkError) {
        console.warn("Chunk load error detected, reloading...");
        window.location.reload();
      }
    };

    window.addEventListener("error", handler);

    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);

  return (
    <ReactQueryProvider>
      <HeroProvider>
        <StripeProvider>
          <GeneralProtectedProvider>
            <SessionProvider>{children}</SessionProvider>
          </GeneralProtectedProvider>
          <DrawerProvider />
        </StripeProvider>
      </HeroProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
    </ReactQueryProvider>
  );
};
