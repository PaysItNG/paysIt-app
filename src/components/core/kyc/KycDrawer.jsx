"use client";
import Drawer from "@/components/shared/ui/Drawer";
import React, { createElement } from "react";
import { ConfigProvider, Steps } from "antd";
import UploadSelfie from "./UploadSelfie";
import { usekYCStore } from "@/store/kyc";
import LivenessCheckPage from "./LivenessCheckPage";

const KycDrawer = () => {
  // const isMobile = useMediaQuery({ maxWidth: 640 });

  const kycStoreData = usekYCStore((state) => state.data);

  const currentStep = usekYCStore((state) => state.data.currentStep);
  const onNext = usekYCStore((state) => state.onNext);
  const onPrev = usekYCStore((state) => state.onPrev);
  const onCloseDrawer = usekYCStore((state) => state.onCloseDrawer);

  const stepsComponent = [
    {
      key: "selfie",
      element: LivenessCheckPage, //TakeSelfie,
    },
    {
      key: "upload_picture",
      element: UploadSelfie,
    },
  ];

  return (
    <>
      <Drawer isOpen={kycStoreData.isOpen} onClose={onCloseDrawer} size="3xl">
        <div className="space-y-6">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#166534",
              },
            }}
          >
            <Steps
              current={currentStep}
              items={[
                {
                  title: "",
                  description: "",
                },
                {
                  title: "",
                  description: "",
                },
              ]}
            />
          </ConfigProvider>
          <div>
            <div className="mt-6">
              {createElement(stepsComponent?.[currentStep].element, {
                onNext: onNext,
                onPrev: onPrev,
                kycStoreData: kycStoreData,
                onCloseDrawer,
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default KycDrawer;
