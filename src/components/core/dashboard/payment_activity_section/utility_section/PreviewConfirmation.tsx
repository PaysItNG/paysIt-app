import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import logo from "@/assets/images/paysIt_logo.jpeg";
import { useUtilityStore } from "@/store/utilityStore";
import { DataPlanType, PreviewDataType } from "@/lib/utils/typeConfig";
import { catchErrFunc } from "@/lib/utils/catchErrFunc";
import { useConfirmModal } from "@/store/confirmModalStore";

const PreviewConfirmation = () => {
  const { data: utilityStoreData, updateData } = useUtilityStore();

  const { openConfirm } = useConfirmModal();

  const {
    previewData,
    product_amount,
    utility_type,
    plan,
    phoneNumber,
    network,
  } = utilityStoreData;

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
    airtime: {
      price: product_amount,
      service_type: utility_type,
      service_id: network,
    },
  };

  //<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>

  const handleConfirm = async () => {
    const payload = utilityPayload[utility_type as keyof typeof utilityPayload];
    openConfirm({
      title: "Please confirm this operation",
      onOk: () => executeConfirmation(payload),
    });
  };

  const executeConfirmation = async (payload: Record<string, unknown>) => {
    try {
      console.log(payload);
    } catch (err) {
      catchErrFunc(err);
    }
  };

  return (
    <>
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
              src={logo}
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
                          className="h-6 w-6"
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
