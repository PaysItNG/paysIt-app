import Button from "@/components/shared/ui/Button";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import logo from "@/assets/images/paysIt_logo.jpeg";
import { useUtilityStore } from "@/store/utilityStore";

const PreviewConfirmation = () => {
  const { updateData } = useUtilityStore();

  //function to go back
  const handleGoBack = () => {
    updateData({
      currentView: "initial",
    });
  };
  //======

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
            <Image src={logo} alt="paysIt logo" width={80} height={80} />
          </div>
          <div className="text-center mb-3">
            <h2 className="font-bold text-2xl">{formatCurrency(3000)}</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-500 text-[0.85rem]">Product Name</p>
              <div className="flex items-center gap-1 text-black font-mediu">
                <div>
                  <Avatar className="h-6 w-6" />
                </div>
                <p className="text-sm">Mobile Data</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 text-[0.85rem]">Recipient</p>

              <p className="text-sm">09160261836</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 text-[0.85rem]">Data Bundle</p>

              <p className="text-sm">1GB - 7days Plan</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 text-[0.85rem]">Amount</p>

              <p className="text-sm">{formatCurrency(3000)}</p>
            </div>
          </div>
          <div className="mt-5">
            <Button className="w-full" color="primary">
              Confirm
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PreviewConfirmation;
