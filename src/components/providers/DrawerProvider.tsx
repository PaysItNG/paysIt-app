import { useViewKycDetailStore } from "@/store/viewKycDetail";
import ViewKycDetailDrawer from "../core/admin/approval/kyc/ViewKycDetailDrawer";
import SendOrDepositDrawer from "../core/dashboard/payment_activity_section/sendOrDeposit/SendOrDepositDrawer";
import UtilityDrawer from "../core/dashboard/payment_activity_section/utility_section/UtilityDrawer";
import EditProfileDrawer from "../core/profile/editprofile/EditProfileDrawer";
import { useEditProfile } from "@/store/editProfile";
import { useSendOrDepositStore } from "@/store/sendOrDepositStore";
import { useUtilityStore } from "@/store/utilityStore";

const DrawerProvider = () => {
  const {
    data: { isOpen: kycDetailOpen },
  } = useViewKycDetailStore();

  const editProfileOpen = useEditProfile((state) => state.data.isOpen);
  const sendOrDepositOpen = useSendOrDepositStore((state) => state.isOpen);
  const utilityOpen = useUtilityStore((state) => state.isOpen);

  return (
    <>
      {/* All Drawers that uses public store to manage will be here so it can be accessed by any component on the app in case want to use it else where */}

      {utilityOpen && <UtilityDrawer />}

      {sendOrDepositOpen && <SendOrDepositDrawer />}

      {editProfileOpen && <EditProfileDrawer />}

      {kycDetailOpen && <ViewKycDetailDrawer />}
    </>
  );
};

export default DrawerProvider;
