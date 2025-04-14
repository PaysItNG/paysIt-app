"use client";
import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { token } = useAuthUser();

  useEffect(() => {
    if (!token?.access) {
      router.push(APP_ROUTES.ADMIN_DASHBOARD);
    }
  }, [router, token?.access]);

  return <>{children}</>;
};

export default AdminProvider;
