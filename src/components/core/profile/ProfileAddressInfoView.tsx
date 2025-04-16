"use client";

import Button from "@/components/shared/ui/Button";
import Card from "@/components/shared/ui/Card";
import { useProfile } from "@/hooks/use-profile";
import { useEditProfile } from "@/store/editProfile";
import React from "react";
import { GoPencil } from "react-icons/go";

const ProfileAddressInfoView = () => {
  const { openDrawer } = useEditProfile();

  const { profileData } = useProfile();

  const handleOpenEditDrawer = () => {
    openDrawer("ADDRESS_INFO");
  };
  return (
    <>
      <Card className="p-6 !shadow-sm">
        <div className="flex justify-between">
          <h3 className="font-semibold">Address</h3>
          <div>
            <Button
              size="lg"
              radius="full"
              variant="bordered"
              startContent={<GoPencil size={20} />}
              onPress={handleOpenEditDrawer}
            >
              Edit
            </Button>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div className="grid gap-7 md:grid-cols-[3fr_3fr] lg:grid-cols-[1.5fr_3fr]">
              <div className="lg:max-w-[30rem]">
                <div className="opacity-70 text-sm">Country</div>
                <div className="font-medium text-base">
                  {profileData?.country || "N/A"}
                </div>
              </div>
              <div className="lg:max-w-[30rem]">
                <div className="opacity-70 text-sm">City/State</div>
                <div className="font-medium text-base">
                  {profileData?.city || "N/A"}
                  {profileData?.state && `/${profileData?.state}`}
                </div>
              </div>
              <div className="lg:max-w-[30rem]">
                <div className="opacity-70 text-sm">Address</div>
                <div className="font-medium text-base break-all whitespace-normal">
                  {profileData?.address || "N/A"}
                </div>
              </div>
              <div className="lg:max-w-[30rem]">
                <div className="opacity-70 text-sm">Phone</div>
                <div className="font-medium text-base break-words">{"N/A"}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfileAddressInfoView;
