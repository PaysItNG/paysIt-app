import { useSubmitKyc } from "@/api/kyc";
import Button from "@/components/shared/ui/Button";
import Title from "@/components/shared/ui/Title";
import UploadImage from "@/components/shared/ui/UploadImage";
import { notifier } from "@/lib/utils/notifier";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { TbChevronLeft } from "react-icons/tb";

interface SelfieFormData {
  file: File | null; // Add the 'file' property
  image: string; // Add the 'image' property
  selfie: string | null;
}

type PropType = {
  onNext: () => void;
  onPrev: () => void;
  onCloseDrawer: () => void;
  kycStoreData: {
    [key: string]: unknown;
  };
};

const UploadSelfie: React.FC<PropType> = ({
  onPrev,
  kycStoreData,
  onCloseDrawer,
}) => {
  const { getValues, setValue } = useForm<SelfieFormData>({
    defaultValues: {
      file: null,
      image: "",
      selfie: null,
    },
  });

  const { mutateAsync: mutateSubmitKyc, isPending: isSubmittingKyc } =
    useSubmitKyc();

  const onSubmit = async () => {
    const selfieFile = getValues().file;
    const id_documentFile = kycStoreData?.livenessImageFile;

    if (!selfieFile || !id_documentFile) {
      notifier({
        type: "error",
        message: "Both selfie and ID document are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("id_document", id_documentFile as Blob);
    formData.append("selfie", selfieFile as Blob);
    try {
      const res = await mutateSubmitKyc(formData);
      notifier({ type: "success", message: res?.message as string });
      onCloseDrawer();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errMsg = error?.response?.data?.message || error?.message;
      notifier({ type: "error", message: errMsg });
    }
  };

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
              // endContent={<TbChevronRight size="20" />}
              onPress={onSubmit}
              isLoading={isSubmittingKyc}
            >
              Submit
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadSelfie;
