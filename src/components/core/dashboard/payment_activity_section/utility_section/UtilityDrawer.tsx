import Drawer from "@/components/shared/ui/Drawer";
import { useUtilityStore } from "@/store/utilityStore";
import AirtimeView from "./airtime/AirtimeView";
import DataView from "./data/DataView";
import { UtilityViews } from "@/lib/utils/typeConfig";
import { JSX } from "react";

const UtilityDrawer = () => {
  const {
    isOpen,
    data: { utility_type },
    closeDrawer,
  } = useUtilityStore();

  const views: Record<UtilityViews, JSX.Element> = {
    airtime: <AirtimeView />,
    data: <DataView />,
    electricity: <div>Electricity</div>,
    cable: <div>Cable</div>,
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={closeDrawer}
        header={<span className="capitalize">Top-up {utility_type}</span>}
      >
        {views[utility_type]}
      </Drawer>
    </>
  );
};

export default UtilityDrawer;
