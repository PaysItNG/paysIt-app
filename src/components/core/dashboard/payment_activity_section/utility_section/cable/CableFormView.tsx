import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import { notifier } from "@/lib/utils/notifier";
import { CablePlanType, PreviewDataType } from "@/lib/utils/typeConfig";
import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useUtilityStore } from "@/store/utilityStore";
import { Image } from "@heroui/react";
import { useGetCableServices, useVerifyCardNumber } from "@/api/vtu";
import { BiCheck } from "react-icons/bi";
import StarLoader from "@/components/shared/ui/loaders/StarLoader";
import { motion, AnimatePresence } from "framer-motion";
import { catchErrFunc } from "@/lib/utils/catchErrFunc";

interface CableService {
  key: string;
  path: string;
  label: string;
}

const cable_services: CableService[] = [
  { key: "gotv", label: "GOtv", path: "/assets/images/gotv.png" },
  { key: "dstv", label: "DStv", path: "/assets/images/dstv.png" },
  {
    key: "startimes",
    label: "StarTimes",
    path: "/assets/images/startimes.png",
  },
];

const CableFormView = () => {
  const {
    data: { phoneNumber: storedPhone, cable_data },
    updateData,
  } = useUtilityStore();

  const { mutateAsync: mutateVerifyMeterNumber, isPending: isVerifyingNumber } =
    useVerifyCardNumber();

  const storedSelectedPlan = cable_data?.selectedPlan ?? {};

  const [phoneNumber, setPhoneNumber] = useState<string>(storedPhone as string);

  const [cardNumber, setCardNumber] = useState<string>(
    cable_data?.cardNumber as string
  );

  const [serviceId, setServiceId] = useState<string>("gotv");
  const [selectedPlan, setSelectedPlan] = useState<CablePlanType>(
    storedSelectedPlan as CablePlanType
  );

  const { data: getCableServicesData, isPending: isLoadingCablePlans } =
    useGetCableServices(serviceId);

  const cableServicesData: CablePlanType[] = getCableServicesData?.data || [];

  const handleTopup = async () => {
    if (!phoneNumber) {
      notifier({ message: "Please enter Recipient Number", type: "error" });
      return;
    } else if (!cardNumber) {
      notifier({ message: "Please Enter your Card Number", type: "error" });
      return;
    } else if (!selectedPlan?.plan_id) {
      notifier({ message: "Please Choose Plan", type: "error" });
      return;
    }

    const verifyRes = await handleVerifyMeterNumber();

    if (verifyRes.verified) {
      const card_number_detail = verifyRes?.data;

      //<<<<<<<<<<<<<<<<<<< PREVIEW DATA >>>>>>>>>>>>>>>>>>>>
      const previewData: PreviewDataType[] = [
        {
          key: "product_name",
          label: "Product Name",
          value: "TV Subscription",
          product_img: "/assets/images/gotv.png", // serviceProvider[network],
        },
        { key: "card_no", label: "Card Number", value: cardNumber },
        {
          key: "customer_name",
          label: "Customer Name",
          value: (card_number_detail?.Customer_Name as string) ?? "",
        },
        { key: "phone_no", label: "Phone Number", value: phoneNumber },
        {
          key: "amount",
          label: "Amount",
          value: formatCurrency(selectedPlan?.price),
        },
        { key: "plan", label: "Plan", value: selectedPlan?.name },
      ];
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>

      updateData({
        cable_data: {
          serviceId,
          cardNumber,
          selectedPlan,
          card_number_detail,
        },
        phoneNumber,
        product_amount: selectedPlan?.price,
        currentView: "preview",
        previewData,
      });
    } else {
      notifier({ type: "error", message: verifyRes?.message as string });
      // setResponseMsg({ state: true, msg: verifyRes?.message as string });
    }
  };

  const handleVerifyMeterNumber = async () => {
    try {
      const json = {
        service_id: serviceId,
        service_type: serviceId,
        card_no: cardNumber,
      };

      const verificationRes = await mutateVerifyMeterNumber(json);
      return verificationRes;
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const handlePlanSelect = (plan: CablePlanType) => {
    setSelectedPlan(plan);
  };

  return (
    <main className="relative">
      <AnimatePresence>
        {isVerifyingNumber && (
          <motion.div
            className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center rounded-xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl text-center shadow-lg"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <StarLoader />
              <p className="mt-2 text-sm text-gray-700">
                Verifying meter number...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {cable_services?.map((service, index) => (
            <div
              key={index + "___services" + service?.key}
              className={`relative shadow-sm rounded-xl flex flex-col items-center justify-center cursor-pointer p-4 transition-all duration-200 border overflow-clip ${
                serviceId === service?.key
                  ? "bg-green-50 border-green-500 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50"
              }`}
              onClick={() => setServiceId(service?.key)}
            >
              {/* Service Logo Placeholder */}

              <Image
                src={service?.path}
                alt={service?.key}
                width={60}
                height={60}
                className="rounded-xl shadow-sm"
                style={{ width: "auto", height: "auto" }}
              />
              {serviceId === service?.key && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <BiCheck className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
        <Input
          aria-label="card_number"
          label="Card Number"
          type="number"
          variant="bordered"
          radius="sm"
          autoComplete="true"
          onChange={(e) => setCardNumber(e.target.value)}
          value={cardNumber}
          className="placeholder:text-gray-400 text-xs"
          classNames={{
            inputWrapper: "px-4 shadow-none border-1",
          }}
        />
        <Input
          aria-label="phone_number"
          label="Phone Number"
          type="number"
          variant="bordered"
          radius="sm"
          min={0}
          autoComplete="true"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className="placeholder:text-gray-400 text-xs no-spinner"
          classNames={{
            inputWrapper: "px-4 shadow-none border-1",
          }}
        />
        <div className="space-y-3 animate-in slide-in-from-top duration-300">
          <label className="block text-sm font-semibold text-gray-700">
            Select Plan
          </label>
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
        </div>

        <div className="flex justify-end">
          <Button
            radius="sm"
            size="lg"
            className="mt-3 text-base bg-green-800 text-white"
            onPress={handleTopup}
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CableFormView;
