import React from "react";
import BalanceView from "./BalanceView";
import SendOrReceiveActionView from "./SendOrReceiveActionView";
import QuickTrasfer from "./QuickTrasfer";

const PaymentinfoSection = () => {
  return (
    <main className="space-y-8">
      <BalanceView />
      <SendOrReceiveActionView />
      <QuickTrasfer />
    </main>
  );
};

export default PaymentinfoSection;
