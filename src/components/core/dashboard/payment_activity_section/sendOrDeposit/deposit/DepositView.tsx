import { useState } from "react";
import DepositModeTab from "./DepositModeTab";
import DepositWithNaira from "./DepositWithNaira";
import DepositWithUSD from "./DepositWithUSD";

type DepositMode = "naira" | "usd";

const DepositView = () => {
  const [depositTab, setDepositTab] = useState<DepositMode>("naira");

  const views = {
    naira: <DepositWithNaira />,
    usd: <DepositWithUSD />,
  };

  return (
    <>
      <main>
        <DepositModeTab setDepositTab={setDepositTab} depositTab={depositTab} />
        <div className="mt-4">{views[depositTab]}</div>
      </main>
    </>
  );
};

export default DepositView;
