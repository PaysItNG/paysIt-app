"use client";
// import useAuthUser from "@/hooks/useAuthUser";
import { Spinner } from "@heroui/react";
import { TbNetworkOff } from "react-icons/tb";
import Button from "../shared/ui/Button";
import { useUserProfile } from "@/api/profile";

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPending: isLoadingProfile, isError: errorGettingProfile } =
    useUserProfile();

  // const { token } = useAuthUser();

  // useEffect(() => {
  //   if (!token?.access) {
  //     router.push(APP_ROUTES.ADMIN_DASHBOARD);
  //   }
  // }, [router, token?.access]);

  return (
    <>
      {isLoadingProfile ? (
        <main className="h-screen w-screen flex items-center justify-center">
          <div className="h-screen w-full flex flex-col justify-center items-center text-center">
            <Spinner size="lg" />
            <p className="mt-6">Just a moment..</p>
          </div>
        </main>
      ) : errorGettingProfile ? (
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
        <>{children}</>
      )}
    </>
  );
};

export default AdminProvider;
