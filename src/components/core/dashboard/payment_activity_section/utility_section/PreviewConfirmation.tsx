import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import React, { FC, useState } from "react";
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
import { TbAlertTriangle } from "react-icons/tb";
import { BiX } from "react-icons/bi";
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

  const { closeConfirm, updateData: updateConfirmData } = useConfirmModal();

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState({
    state: false,
    payload: {},
  });

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

    setIsOpenConfirmModal({ state: true, payload });
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
        utility_type,
      });
    } catch (err) {
      catchErrFunc(err);
    } finally {
      updateConfirmData({ isLoading: false });
    }
  };

  const handleCancelConfirmModal = () => {
    setIsOpenConfirmModal({ state: false, payload: {} });
  };

  return (
    <>
      <main className="relative h-screen">
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

        <ConfirmationModal
          isOpen={isOpenConfirmModal.state}
          onConfirm={() => executeConfirmation(isOpenConfirmModal.payload)}
          onCancel={handleCancelConfirmModal}
          isLoading={isLoading}
        />
      </main>
    </>
  );
};

export default PreviewConfirmation;

const ConfirmationModal: FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  title?: string;
  message?: string;
}> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this operation?",
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/5 bg-opacity-40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out animate-slide-up"
        style={{
          animation: "slideUp 0.3s ease-out forwards",
        }}
      >
        {/* Header with gradient accent */}
        <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
              <TbAlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
            </div>
            <button
              onClick={onCancel}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <BiX className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <Button onPress={onCancel} variant="bordered">
            Cancel
          </Button>
          <Button onPress={onConfirm} color="primary" isLoading={isLoading}>
            Confirm
          </Button>
        </div>
      </div>

      {/* Move the style inside the component */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
