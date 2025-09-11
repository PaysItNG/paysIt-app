import StarLoader from "@/components/shared/ui/loaders/StarLoader";
import { CablePlanType } from "@/lib/utils/typeConfig";
import { useUtilityStore } from "@/store/utilityStore";
import React, { FC, useState } from "react";
import { BiCheck } from "react-icons/bi";

type PropTypes = {
  cableServicesData: CablePlanType[];
  isLoadingCablePlans: boolean;
};

const CablePlans: FC<PropTypes> = ({
  isLoadingCablePlans,
  cableServicesData,
}) => {
  const {
    data: { cable_data },
  } = useUtilityStore();

  const storedSelectedPlan = cable_data?.selectedPlan ?? {};

  const [selectedPlan, setSelectedPlan] = useState<CablePlanType>(
    storedSelectedPlan as CablePlanType
  );

  const serviceId = cable_data?.serviceId as string;

  const handlePlanSelect = (plan: CablePlanType) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <div className="space-y-2 max-h-[25rem] shadow-sm overflow-y-auto">
        {isLoadingCablePlans ? (
          <div className="flex items-center justify-center h-64">
            <StarLoader size={28} />
          </div>
        ) : cableServicesData?.length > 0 ? (
          cableServicesData.map((plan) => (
            <div
              key={plan.plan_id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedPlan.plan_id === plan.plan_id
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-200 hover:border-green-300 hover:bg-green-50"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm capitalize">
                    {plan.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-green-600">
                      ₦{plan.price.toFixed(0)}
                    </span>
                    {plan.provider_price < plan.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ₦{plan.provider_price.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-2 inline-block">
                    {plan.provider}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan.plan_id === plan.plan_id
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPlan.plan_id === plan.plan_id && (
                    <BiCheck className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">
              No plans available for {serviceId?.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CablePlans;
