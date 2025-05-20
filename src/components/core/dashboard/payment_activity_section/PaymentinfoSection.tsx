import React from "react";
import BalanceView from "./BalanceView";
import SendOrReceiveActionView from "./sendOrDeposit/SendOrReceiveActionView";
import QuickTransfer from "./QuickTransfer";
import UtilitySection from "./utility_section/UtilitySection";

const PaymentinfoSection = () => {
  return (
    <main className="space-y-8 order-1 lg:order-2">
      <BalanceView />
      <SendOrReceiveActionView />
      <QuickTransfer />
      <UtilitySection />
    </main>
  );
};

export default PaymentinfoSection;
