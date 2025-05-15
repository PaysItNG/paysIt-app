import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { notifier } from "@/lib/utils/notifier";
import { DataPlanType, NetworkType } from "@/lib/utils/typeConfig";
import { useUtilityStore } from "@/store/utilityStore";
import React, { FC } from "react";

type PropTypes = {
  phoneNumber: string | number | null;
  plan: DataPlanType;
  network: NetworkType;
};

const DataPlanCard: FC<PropTypes> = ({ phoneNumber, plan, network }) => {
  const { updateData } = useUtilityStore();
  const handleTopup = () => {
    if (!phoneNumber) {
      notifier({ message: "Please enter Recipient Number", type: "error" });
      return;
    }
    updateData({
      phoneNumber,
      network,
      plan,
      currentView: "preview",
    });
  };

  return (
    <>
      <div className="bg-green-800 rounded-xl py-1 border- shadow-sm">
        <div className="p-2 bg-white rounded-xl rounded-b-none flex flex-col gap-y-2 items-center">
          <div className="h-16 w-16 rounded-full p-3 text-sm flex justify-center items-center bg-gradient-to-r from-green-800 to-green-500 font-semibold">
            <div className="h-14 w-14 rounded-full flex items-center justify-center p-2 bg-white">
              <p className="text-sm bg-gradient-to-r from-green-800 to-green-500 bg-clip-text text-transparent font-semibold">
                {plan?.qty}
              </p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-base">
              {formatCurrency(plan?.price)}
            </h3>
            <p className="text-gray-500 text-[0.85rem]">{plan?.displayName}</p>
            {/* <div className="pt-2 pb-1">
              <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-500 w-full">
                Validity:{" "}
                <span className="font-medium text-black text-[0.75rem]">
                  1 Day
                </span>
              </span>
            </div> */}
          </div>
        </div>
        <Button
          className="w-full rounded-t-none"
          size="sm"
          color="primary"
          radius="sm"
          variant="solid"
          onPress={() => handleTopup()}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default DataPlanCard;
