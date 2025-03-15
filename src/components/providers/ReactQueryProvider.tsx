import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
      },
    },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
