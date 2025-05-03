import React from "react";
import BalanceView from "./BalanceView";
import SendOrReceiveActionView from "./SendOrReceiveActionView";
import QuickTransfer from "./QuickTransfer";

const PaymentinfoSection = () => {
  return (
    <main className="space-y-8">
      <BalanceView />
      <SendOrReceiveActionView />
      <QuickTransfer />
    </main>
  );
};

export default PaymentinfoSection;
