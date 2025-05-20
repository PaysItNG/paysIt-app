import Drawer from "@/components/shared/ui/Drawer";
import { useSendOrDepositStore } from "@/store/sendOrDepositStore";
import DepositView from "./deposit/DepositView";
import { JSX } from "react";
import SendView from "./send/SendView";

type ViewTypes = "send" | "deposit";

const SendOrDepositDrawer = () => {
  const {
    isOpen,
    data: { transaction_type },
    closeDrawer,
  } = useSendOrDepositStore();

  const views: Record<ViewTypes, JSX.Element> = {
    send: <SendView />,
    deposit: <DepositView />,
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={closeDrawer}
        header={
          <span className="capitalize">
            {transaction_type === "send" ? "Transfer" : "Deposit"}
          </span>
        }
      >
        {views[transaction_type as ViewTypes]}
      </Drawer>
    </>
  );
};

export default SendOrDepositDrawer;
