import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useUtilityStore } from "@/store/utilityStore";
import {
  CablePlanType,
  DataPlanType,
  PreviewDataType,
} from "@/lib/utils/typeConfig";
import { catchErrFunc } from "@/lib/utils/catchErrFunc";
import { useConfirmModal } from "@/store/confirmModalStore";
import { useBuyUtilityService } from "@/api/vtu";
import { motion, AnimatePresence } from "framer-motion";
import TransactionSummaryReceipt from "./TransactionSummaryReceipt";
interface CableDataType {
  serviceId: string;
  cardNumber: string;
  selectedPlan?: CablePlanType;
  // add other fields if needed
}

const PreviewConfirmation = () => {
  const { data: utilityStoreData, updateData } = useUtilityStore();

  const { mutateAsync: mutateBuyUtility, isPending: isLoading } =
    useBuyUtilityService();

  const {
    openConfirm,
    closeConfirm,
    updateData: updateConfirmData,
  } = useConfirmModal();

  const {
    previewData,
    product_amount,
    utility_type,
    plan,
    phoneNumber,
    network,
    cable_data,
    electricity_data,
  } = utilityStoreData as typeof utilityStoreData & {
    cable_data?: CableDataType;
  };

  const dataPlan = { ...(plan as DataPlanType) };
  //function to go back
  const handleGoBack = () => {
    updateData({
      currentView: "initial",
    });
  };
  //======

  //<<<<<<<<<<<<< Utility types payload >>>>>>>>>>>>>>>
  const utilityPayload = {
    data: {
      price: dataPlan?.price,
      provider_price: dataPlan?.provider_price,
      provider: dataPlan?.provider,
      plan_id: dataPlan?.plan_id,
      service_id: dataPlan?.service_id,
      phone_no: phoneNumber,
      service_type: utility_type,
    },
    cable: {
      service_id: cable_data?.serviceId as string,
      card_no: cable_data?.cardNumber as string,
      price: product_amount as string,
      subscription_type: "renew",
      plan_id: cable_data?.selectedPlan?.plan_id as string,
      phone_no: phoneNumber,
      service_type: "tv",
    },
    electricity: {
      service_id: electricity_data?.serviceId,
      meter_no: electricity_data?.meterNumber,
      price: product_amount,
      phone_no: phoneNumber,
      meter_type: electricity_data?.meter_type,
      service_type: "ELECTRICITY",
    },
    airtime: {
      price: product_amount,
      service_type: utility_type,
      service_id: network || "MTN",
      phone_no: phoneNumber,
    },
  };

  //<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>

  const handleConfirm = async () => {
    const payload = utilityPayload[utility_type as keyof typeof utilityPayload];

    openConfirm({
      title: "Please confirm this operation",
      isLoading: isLoading,
      onOk: () => executeConfirmation(payload),
    });
  };

  const executeConfirmation = async (payload: Record<string, unknown>) => {
    updateConfirmData({ isLoading: true });
    try {
      const res = await mutateBuyUtility(payload);
      console.log(res);
      closeConfirm(); //this will close the custom confirm modal

      const product = (previewData as PreviewDataType[])?.find(
        (item) => item?.key === "product_name"
      );

      updateData({
        currentView: "receipt",
        transaction_response: res?.data,
        product_img: product?.product_img,
        product_name: product?.value,
      });
    } catch (err) {
      catchErrFunc(err);
    } finally {
      updateConfirmData({ isLoading: false });
    }
  };

  return (
    <>
      {/* <AnimatePresence>
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white w-full max-w-md p-6 rounded-xl text-center shadow-lg space-y-4"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="mt-2 text-sm text-gray-700">
              Please confirm this operation
            </p>
            <div className="flex justify-between gap-6">
              <Button>Cancel</Button>
              <Button color="primary">Confirm</Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence> */}
      <main className="relative">
        <Button
          isIconOnly
          color="primary"
          radius="full"
          size="sm"
          className="absolute left-0"
          onPress={handleGoBack}
        >
          <IoArrowBackOutline size={20} />
        </Button>

        <div className="w-full max-w-lg md:px-8 space-y-4">
          <div className="flex justify-center mb-4">
            <Image
              src={"/assets/images/paysIt_logo.jpeg"}
              alt="paysIt logo"
              width={60}
              height={60}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className="text-center mb-3">
            <h2 className="font-bold text-2xl">
              {formatCurrency(product_amount as number)}
            </h2>
          </div>
          <div className="space-y-3">
            {(previewData as PreviewDataType[])?.map(
              (item: PreviewDataType, index: number) => {
                return item?.key === "product_name" ? (
                  <div
                    className="flex justify-between"
                    key={index + "___preview" + item?.key}
                  >
                    <p className="text-gray-500 text-[0.85rem]">
                      {item?.label}
                    </p>
                    <div className="flex items-center gap-1 text-black font-mediu">
                      <div>
                        <Avatar
                          src={
                            item?.product_img ||
                            "https://images.unsplash.com/broken"
                          }
                          className="h-8 w-8"
                        />
                      </div>
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between" key={index}>
                    <p className="text-gray-500 text-[0.85rem]">
                      {item?.label}
                    </p>

                    <p className="text-sm">{item?.value}</p>
                  </div>
                );
              }
            )}
          </div>
          <div className="mt-5">
            <Button className="w-full" color="primary" onPress={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PreviewConfirmation;
