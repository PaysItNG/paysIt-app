import { useProfile } from "@/hooks/use-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
// import { Modal } from "antd";
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

  const { openConfirm } = useConfirmModal();

  // const { confirm } = Modal;

  useEffect(() => {
    const executeLogout = () => {
      removeAuthUser();
      router.push(APP_ROUTES.LOGIN);
    };
    if (error && (error as AxiosError)?.status === 401) {
      openConfirm({
        title: "Please confirm this operation",
        onOk: () => executeLogout,
      });
    }
  }, [error, router, removeAuthUser, openConfirm]);
  return (
    <>
      <ConfirmModal />
      {children}
    </>
  );
};

export default GeneralProtectedProvider;
