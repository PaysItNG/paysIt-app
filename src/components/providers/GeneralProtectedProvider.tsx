import { useProfile } from "@/hooks/use-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConfirmModal from "../shared/ui/ConfirmModal";
import { useConfirmModal } from "@/store/confirmModalStore";

const GeneralProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const { error } = useProfile();

  const { removeAuthUser } = useAuthUser();

  const { openConfirm, closeConfirm } = useConfirmModal();

  useEffect(() => {
    const executeLogout = () => {
      removeAuthUser();
      router.push(APP_ROUTES.LOGIN);
      closeConfirm();
    };
    if (error && (error as AxiosError)?.status === 401) {
      openConfirm({
        title: "Your login session has expired, please re-login",
        okText: "Re-login",
        onOk: () => executeLogout(),
      });
    }
  }, [error, router, removeAuthUser, openConfirm, closeConfirm]);
  return (
    <>
      <ConfirmModal />
      {children}
    </>
  );
};

export default GeneralProtectedProvider;
