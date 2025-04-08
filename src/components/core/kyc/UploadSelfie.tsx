import Title from "@/components/shared/ui/Title";
import UploadImage from "@/components/shared/ui/UploadImage";
import { Button } from "@heroui/react";
import React from "react";
import { UseFormSetValue, UseFormGetValues, useForm } from "react-hook-form";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface ValueType {
  file: File | null; // Add the 'file' property
  image: string; // Add the 'image' property
  selfie: string | null;
}

type PropType = {
  onNext: () => void;
  onPrev: () => void;
};

const UploadSelfie: React.FC<PropType> = ({ onPrev, onNext }) => {
  const { getValues, setValue } = useForm<FormData>({});

  return (
    <>
      <main className="container">
        <Title
          title="KYC Verification"
          sub="Upload your recent Picture for confirmation"
          classNames={{
            base: "flex justify-center text-center",
          }}
        />
        <div className="space-y-6 mt-6">
          <div className="min-h-[45vh] w-full max-w-md mx-auto">
            <UploadImage getValues={getValues} setValue={setValue} />
          </div>
          <div className="flex justify-between w-full">
            <Button
              radius="full"
              size="lg"
              variant="bordered"
              className="mt-5 text-base text-gray-500"
              startContent={<TbChevronLeft size="20" />}
              onPress={onPrev}
            >
              Back
            </Button>
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

export default UploadSelfie;
