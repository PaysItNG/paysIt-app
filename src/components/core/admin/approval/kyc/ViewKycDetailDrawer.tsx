import Drawer from "@/components/shared/ui/Drawer";
import { useViewKycDetailStore } from "@/store/viewKycDetail";
import React from "react";
import KycDetail from "./KycDetail";

const ViewKycDetailDrawer = () => {
  const {
    data: { isOpen },
    closeDrawer,
  } = useViewKycDetailStore();
  return (
    <>
      <Drawer size="2xl" isOpen={isOpen} onClose={closeDrawer}>
        <KycDetail />
      </Drawer>
    </>
  );
};

export default ViewKycDetailDrawer;
