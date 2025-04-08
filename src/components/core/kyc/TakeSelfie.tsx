"use client";
import Button from "@/components/shared/ui/Button";
import Title from "@/components/shared/ui/Title";
import React from "react";
import { TbChevronRight } from "react-icons/tb";

type PropType = {
  onNext: () => void;
};

const TakeSelfie: React.FC<PropType> = ({ onNext }) => {
  return (
    <>
      <main className="container my-auto">
        <div className="space-y-6 flex flex-col items-center px-6">
          <Title
            title="KYC Verification"
            sub="Tap to take a selfie"
            classNames={{
              base: "flex justify-center text-center",
            }}
          />
          <div className="min-h-[45vh]">
            <div className="h-52 w-52 rounded-full bg-default-200"></div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              radius="full"
              size="lg"
              className="mt-5 text-base bg-primary text-white"
              endContent={<TbChevronRight size="20" />}
              onPress={onNext}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default TakeSelfie;
