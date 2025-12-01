import Button from "@/components/shared/ui/Button";
import Input from "@/components/shared/ui/Input";
import { notifier } from "@/lib/utils/notifier";
import React, { useState } from "react";
import { useUtilityStore } from "@/store/utilityStore";
import { BiCheck } from "react-icons/bi";
import NumberInput from "@/components/shared/ui/NumberInput";
import DistributionView, { ElectricityDistribution } from "./DistributionView";
import { useVerifyCardNumber } from "@/api/vtu";
// import { catchErrFunc } from "@/lib/utils/catchErrFunc";
import StarLoader from "@/components/shared/ui/loaders/StarLoader";
import { PreviewDataType } from "@/lib/utils/typeConfig";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { motion, AnimatePresence } from "framer-motion";
import { LiaTimesSolid } from "react-icons/lia";
import { AxiosError } from "axios";

interface CableService {
  key: string;
  path: string;
  label: string;
}

const electricity_type: CableService[] = [
  { key: "prepaid", label: "Prepaid", path: "/assets/images/gotv.png" },
  { key: "postpaid", label: "Postpaid", path: "/assets/images/dstv.png" },
];

// Electricity distributions data in JSON format

const ElectricityFormView = () => {
  const {
    data: { phoneNumber: storedPhone, electricity_data, product_amount },
    updateData,
  } = useUtilityStore();

  const { mutateAsync: mutateVerifyMeterNumber, isPending: isVerifyingNumber } =
    useVerifyCardNumber();

  const storedSelectedDistribution =
    electricity_data?.selectedDistribution ?? {};

  const [phoneNumber, setPhoneNumber] = useState<string>(
    (storedPhone as string) || ""
  );

  const [meterNumber, setMeterNumber] = useState<string>(
    (electricity_data?.meterNumber as string) || ""
  );

  const [amount, setAmount] = useState<number>(product_amount as number);

  const [responseMsg, setResponseMsg] = useState<{
    state: boolean;
    msg: string;
  }>({ state: false, msg: "" });

  const [meterType, setMeterType] = useState<string>(
    electricity_data?.meter_type || "prepaid"
  );

  const [selectedDistribution, setSelectedDistribution] =
    useState<ElectricityDistribution>(
      storedSelectedDistribution as ElectricityDistribution
    );

  const handleTopup = async () => {
    if (!phoneNumber) {
      notifier({ message: "Please enter Phone Number", type: "error" });
      return;
    } else if (!meterNumber) {
      notifier({ message: "Please Enter your Meter Number", type: "error" });
      return;
    } else if (!selectedDistribution?.id) {
      notifier({ message: "Please Choose your Distribution", type: "error" });
      return;
    }

    const verifyRes = await handleVerifyMeterNumber();

    if (verifyRes && verifyRes.verified) {
      const meter_number_detail = verifyRes?.data;

      //<<<<<<<<<<<<<<<<<<< PREVIEW DATA >>>>>>>>>>>>>>>>>>>>
      const previewData: PreviewDataType[] = [
        {
          key: "product_name",
          label: "Product Name",
          value: "Electricity",
          product_img: "/assets/images/electricity-icon.jpg",
        },
        { key: "meter_no", label: "Meter Number", value: meterNumber },
        {
          key: "customer_name",
          label: "Customer Name",
          value: (meter_number_detail?.Customer_Name as string) ?? "",
        },
        {
          key: "distribution",
          label: "Distribution",
          value: selectedDistribution?.fullName,
        },
        { key: "phone_no", label: "Phone Number", value: phoneNumber },
        {
          key: "amount",
          label: "Amount",
          value: formatCurrency(amount),
        },
        { key: "meter_type", label: "Meter Type", value: meterType },
      ];
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>

      updateData({
        electricity_data: {
          serviceId: selectedDistribution?.id,
          meterNumber,
          selectedDistribution,
          meter_type: meterType,
        },
        product_img: "/assets/images/electricity-icon.jpg",
        product_name: "Electricity",
        phoneNumber,
        product_amount: amount,
        currentView: "preview",
        previewData,
      });
      setResponseMsg({ state: false, msg: "" });
    } else {
      setResponseMsg({ state: true, msg: verifyRes?.message as string });
    }
  };

  const handleVerifyMeterNumber = async () => {
    try {
      const json = {
        service_id: selectedDistribution?.id,
        service_type: meterType,
        meter_no: meterNumber,
      };

      const verificationRes = await mutateVerifyMeterNumber(json);
      return verificationRes;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errMsg = error?.response?.data?.message || error?.message;
      setResponseMsg({ state: true, msg: errMsg });
    }
  };

  const handleCloseResponseMsg = () => {
    setResponseMsg({ state: false, msg: "" });
  };

  return (
    <main className="relative p-4">
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
        {responseMsg.state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-red-200 rounded-xl bg-red-100 text-red-500 p-4 text-sm text-center relative"
          >
            {responseMsg.msg}
            <div className="absolute -top-3 -right-3">
              <Button
                isIconOnly
                variant="solid"
                radius="full"
                size="sm"
                color="danger"
                onPress={handleCloseResponseMsg}
              >
                <LiaTimesSolid size={20} />
              </Button>
            </div>
          </motion.div>
        )}
        <div className="flex items-center justify-center gap-6">
          {electricity_type?.map((meter, index) => (
            <div
              key={index + "___meters" + meter?.key}
              className={`relative shadow-sm rounded-xl flex flex-col items-center justify-center cursor-pointer py-4 px-10 transition-all duration-200 border overflow-clip ${
                meterType === meter?.key
                  ? "bg-green-50 border-green-500 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50"
              }`}
              onClick={() => setMeterType(meter?.key)}
            >
              {/* Service Logo Placeholder */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2 ${
                  meter.key === "prepaid"
                    ? "bg-red-500"
                    : meter.key === "postpaid"
                    ? "bg-blue-600"
                    : "bg-orange-500"
                }`}
              >
                {meter.key === "prepaid"
                  ? "PR"
                  : meter.key === "postpaid" && "PS"}
              </div>
              <span className="text-xs font-medium text-gray-700 mt-1">
                {meter.label}
              </span>
              {meterType === meter?.key && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  <BiCheck className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Input
          aria-label="meter_number"
          label="Meter Number"
          type="number"
          variant="bordered"
          radius="sm"
          autoComplete="true"
          onChange={(e) => setMeterNumber(e.target.value)}
          value={meterNumber}
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
        <NumberInput
          aria-label="amount"
          variant="bordered"
          label="Amount"
          radius="sm"
          step={10}
          value={amount}
          onValueChange={(value) => setAmount(value)}
        />

        <DistributionView
          selectedDistribution={selectedDistribution}
          setSelectedDistribution={setSelectedDistribution}
        />

        <div className="flex justify-end">
          <Button
            radius="sm"
            size="lg"
            className="mt-3 text-base bg-green-800 text-white"
            onPress={handleTopup}
          >
            {}
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ElectricityFormView;
