import { Tab, Tabs } from "@heroui/react";
import React, { FC } from "react";

type DepositMode = "naira" | "usd";

interface PropTypes {
  setDepositTab: (tab: DepositMode) => void;
  depositTab: string;
}

const DepositModeTab: FC<PropTypes> = ({ setDepositTab, depositTab }) => {
  return (
    <div>
      <Tabs
        aria-label="Tabs variants"
        fullWidth
        classNames={{
          tab: "font-semibold w-full",
          tabList: "gap-6 w-full relative",
          tabContent: "group-data-[selected=true]:bg-primary",
        }}
        color="primary"
        selectedKey={depositTab}
        onSelectionChange={(key) => setDepositTab(key as DepositMode)}
      >
        <Tab key="naira" title="Deposit in Naira" />
        <Tab key="usd" title="Deposit with USDT" />
      </Tabs>
    </div>
  );
};

export default DepositModeTab;
