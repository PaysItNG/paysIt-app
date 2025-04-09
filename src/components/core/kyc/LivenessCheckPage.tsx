"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ClientSideLivenessDetector from "@/components/shared/ClientSideLivenessDetector";

// Import the component with no SSR since it uses browser APIs
// const ClientSideLivenessDetector = dynamic(
//   () => import("../components/ClientSideLivenessDetector"),
//   { ssr: false }
// );

export default function LivenessCheckPage() {
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const handleVerificationComplete = (success, data) => {
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

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">
        Start Liveness Face Verification
      </h1>

      {!verificationComplete ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">
            This verification ensures you are a real person present at your
            device.
          </p>

          <ClientSideLivenessDetector onComplete={handleVerificationComplete} />

          {/* <div className="mt-4 text-sm text-gray-600">
            <p>
              Privacy notice: All face processing is done entirely on your
              device. No images are sent to any server.
            </p>
          </div> */}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {verificationSuccess ? (
            <div className="text-center text-green-600">
              <h2 className="text-xl font-bold mb-3">
                Verification Successful!
              </h2>
              <p>You have been verified as a live person.</p>
              <p className="mt-2 text-gray-700">
                Verification completed at: {new Date().toLocaleString()}
              </p>
              <button
                onClick={resetVerification}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Again
              </button>
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
}
