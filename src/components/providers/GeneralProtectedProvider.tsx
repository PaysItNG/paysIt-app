import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConfirmModal from "../shared/ui/ConfirmModal";
import { useConfirmModal } from "@/store/confirmModalStore";
import { isTokenExpiringSoon } from "@/lib/utils/checkTokenExpiration";
import { useRefreshToken } from "@/api/auth/login";

const GeneralProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  // const { error } = useProfile();

  const { removeAuthUser, token, setAuthUser } = useAuthUser();

  const { openConfirm, closeConfirm } = useConfirmModal();

  const { mutateAsync: mutateRefreshToken } = useRefreshToken();

  // useEffect(() => {
  //   const executeLogout = () => {
  //     removeAuthUser();
  //     router.push(APP_ROUTES.LOGIN);
  //     closeConfirm();
  //   };
  //   if (error && (error as AxiosError)?.status === 401) {
  //     openConfirm({
  //       title: "Your login session has expired, please re-login",
  //       okText: "Re-login",
  //       onOk: () => executeLogout(),
  //     });
  //   }
  // }, [error, router, removeAuthUser, openConfirm, closeConfirm]);

  //<<<<<<<<<<<<This effect will be checking if access is about to expire and will try to run refresh token function>>>>>>>>>>>>>>>>>>

  const refreshTokenFunc = async () => {
    /// This function runs the request to refresh token
    try {
      const res = await mutateRefreshToken({
        refresh: token?.refresh as string,
      });
      const authToken = {
        token: {
          refresh: token?.refresh as string,
          access: res?.access as string,
        },
      };
      setAuthUser(authToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      openConfirm({
        title: "Your login session has expired, please re-login",
        okText: "Re-login",
        onOk: () => executeLogout(),
        no_cancel: true,
      });
    }
  };

  const executeLogout = () => {
    removeAuthUser();
    router.push(APP_ROUTES.LOGIN);
    closeConfirm();
  };

  useEffect(() => {
    const accessTokenExpired = isTokenExpiringSoon(token?.access || "");

    if (accessTokenExpired) {
      //run function to refesh token
      refreshTokenFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateRefreshToken, token?.access, token?.refresh]);
  //<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>

  return (
    <>
      <ConfirmModal />
      {children}
    </>
  );
};

export default GeneralProtectedProvider;
