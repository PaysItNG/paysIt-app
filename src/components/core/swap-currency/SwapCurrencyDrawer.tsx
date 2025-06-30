import Drawer from "@/components/shared/ui/Drawer";
import React from "react";
import SwapCurrency from "./SwapCurrency";
import { useSwapCurrencyStore } from "@/store/swapCurrencyStore";

const SwapCurrencyDrawer = () => {
  const {
    data: { isOpen },
    closeDrawer,
  } = useSwapCurrencyStore();
  return (
    <>
      <Drawer size="2xl" isOpen={isOpen} onClose={closeDrawer}>
        <SwapCurrency />
      </Drawer>
    </>
  );
};

export default SwapCurrencyDrawer;
