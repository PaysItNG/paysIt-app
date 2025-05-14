import { useProfile } from "@/hooks/use-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { APP_ROUTES } from "@/lib/routes";
// import { Modal } from "antd";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { IoWarningSharp } from "react-icons/io5";

const GeneralProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const { error } = useProfile();

  const { removeAuthUser } = useAuthUser();

  // const { confirm } = Modal;

  useEffect(() => {
    // if (error && (error as AxiosError)?.status === 401) {
    //   // confirm({
    //   //   title: 'Your Login session has expired, please re-login',
    //   //   icon: <IoWarningSharp />,
    //   //   onOk() {
    //   //     removeAuthUser();
    //   //   router.push(APP_ROUTES.LOGIN);
    //   //   },
    //   //   onCancel() {
    //   //   },
    //   // });
    //   const relogin = window.confirm(
    //     "Your Login session has expired, please re-login"
    //   );
    //   if (relogin) {
    //     removeAuthUser();
    //     router.push(APP_ROUTES.LOGIN);
    //   }
    // }
  }, [error, router, removeAuthUser]);
  return children;
};

export default GeneralProtectedProvider;
