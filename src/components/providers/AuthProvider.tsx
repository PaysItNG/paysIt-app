"use client";

import { KycStatus, useGetKycStatus } from "@/api/kyc";
import { useUserProfile } from "@/api/profile";
import Button from "@/components/shared/ui/Button";
import { Spinner } from "@heroui/react";
import { TbNetworkOff } from "react-icons/tb";
import KycDrawer from "../core/kyc/KycDrawer";
import { usekYCStore } from "@/store/kyc";
import { useEffect, useMemo } from "react";
import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPending: isLoadingProfile, isError: errorGettingProfile } =
    useUserProfile();

  const router = useRouter();

  const { token } = useAuthUser();

  const {
    data: kycStatus,
    isPending: isLoadingKycStatus,
    isError: errorGettingKycStatus,
  } = useGetKycStatus();

  const onOpenKycDrawer = usekYCStore((state) => state.onOpenDrawer);
  const onCloseKycDrawer = usekYCStore((state) => state.onCloseDrawer);

  const kycDetail = useMemo(() => {
    return kycStatus?.kyc as KycStatus | undefined;
  }, [kycStatus]);

  useEffect(() => {
    if (!token?.access) {
      router.push(APP_ROUTES.DASHBOARD);
    }
  }, [router, token?.access]);

  useEffect(() => {
    if (!kycDetail?.submitted) {
      onOpenKycDrawer();
    } else {
      onCloseKycDrawer();
    }
  }, [kycDetail?.submitted, onOpenKycDrawer, onCloseKycDrawer]);

  return (
    <>
      {isLoadingProfile || isLoadingKycStatus ? (
        <main className="h-screen w-screen flex items-center justify-center">
          <div className="h-screen w-full flex flex-col justify-center items-center text-center">
            <Spinner size="lg" />
            <p className="mt-6">Just a moment..</p>
          </div>
        </main>
      ) : errorGettingProfile || errorGettingKycStatus ? (
        <div className="h-screen w-full flex flex-col justify-center items-center text-center">
          <TbNetworkOff className="text-6xl text-red-500 opacity-50" />
          <p className="max-w-[300px] mt-10">
            A network error occurred while fetching data, please try again
          </p>
          <Button
            variant="bordered"
            onPress={() => window.location.reload()}
            className="mt-8"
          >
            Reload
          </Button>
        </div>
      ) : (
        <>
          {children}
          <KycDrawer />
        </>
      )}
    </>
  );
};

export default AuthProvider;
