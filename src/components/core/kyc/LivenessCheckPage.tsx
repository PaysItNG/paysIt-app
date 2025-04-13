"use client";
import { useState } from "react";
import ClientSideLivenessDetector from "@/components/shared/ClientSideLivenessDetector";
import Button from "@/components/shared/ui/Button";
import Image from "next/image";
import clsx from "clsx";
import { usekYCStore } from "@/store/kyc";
import { TbChevronRight } from "react-icons/tb";

type PropType = {
  onNext: () => void;
};

interface VerificationData {
  id: string;
  timestamp: number;
  challenge: string;
  passed: boolean;
  frames: string[];
  [key: string]: unknown; // Optional: Add this if the object has additional dynamic fields
}

const LivenessCheckPage: React.FC<PropType> = ({ onNext }) => {
  const [verificationComplete, setVerificationComplete] =
    useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] =
    useState<boolean>(false);
  const [, setVerificationData] = useState<VerificationData | null>(null);

  const [frameCaptured, setFrameCaptured] = useState<string>("");
  const [livenessImageFile, setLivenessImageFile] = useState<File | null>(null);

  const { updateData: updateKycData, data: kycStoreData } = usekYCStore();

  // console.log(verificationData);

  const handleVerificationComplete = (
    success: boolean,
    data: VerificationData
  ) => {
    setVerificationComplete(true);
    setVerificationSuccess(success);
    setVerificationData(data);

    // Here you can store the result locally or send to your backend if needed
    if (success) {
      // You might want to save a verification token to localStorage
      localStorage.setItem("livenessVerified", Date.now().toString());

      // Or if you need to inform a backend but without using it for verification:
      // fetch('/api/log-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ success, timestamp: Date.now() })
      // });
    }
  };

  const resetVerification = () => {
    setVerificationComplete(false);
    setVerificationSuccess(false);
    setVerificationData(null);
  };

  const handleContinue = () => {
    updateKycData({
      livenessImageFile,
      frameCapturedPreviewUrl: frameCaptured,
    });
    onNext();
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">
        Start Liveness Face Verification
      </h1>

      {!verificationComplete ? (
        <div className="bg-white p-6 rounded-lg w-[100%] max-w-[480px]">
          {/* <p className="mb-4">
            This verification ensures you are a real person present at your
            device.
          </p> */}

          <ClientSideLivenessDetector
            onComplete={handleVerificationComplete}
            setFrameCaptured={setFrameCaptured}
            setLivenessImageFile={setLivenessImageFile}
          />

          {/* <div className="mt-4 text-sm text-gray-600">
            <p>
              Privacy notice: All face processing is done entirely on your
              device. No images are sent to any server.
            </p>
          </div> */}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {frameCaptured ||
          kycStoreData?.frameCapturedPreviewUrl ||
          verificationSuccess ? (
            <div className="text-center text-green-600">
              <h2 className="text-xl font-semibold mb-3">
                Verification Successful!
              </h2>
              <div>
                <Image
                  src={frameCaptured}
                  alt="liveness_check_image"
                  className={clsx("w-[100%] max-w-[480px] rounded-[8px]")}
                  width={480}
                  height={200}
                />
              </div>

              <p>You have been verified as a live person.</p>
              <p className="mt-2 text-gray-700">
                Verification completed at: {new Date().toLocaleString()}
              </p>
              <div className="flex justify-between">
                <Button
                  radius="full"
                  size="lg"
                  variant="bordered"
                  className="mt-5 text-base  text-primary border-primary"
                  onPress={resetVerification}
                >
                  Start Again
                </Button>
                <Button
                  radius="full"
                  size="lg"
                  className="mt-5 text-base bg-green-800 text-white"
                  onPress={handleContinue}
                  endContent={<TbChevronRight size="20" />}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-600">
              <h2 className="text-xl font-bold mb-3">Verification Failed</h2>
              <p>We couldn&apos;t verify your liveness. Please try again.</p>
              <button
                onClick={resetVerification}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LivenessCheckPage;
