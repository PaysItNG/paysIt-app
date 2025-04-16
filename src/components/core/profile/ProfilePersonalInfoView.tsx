"use client";

import Button from "@/components/shared/ui/Button";
import Card from "@/components/shared/ui/Card";
import { useProfile } from "@/hooks/use-profile";
import { useEditProfile } from "@/store/editProfile";
import React from "react";
import { GoPencil } from "react-icons/go";

const ProfilePersonalInfoView = () => {
  const { openDrawer } = useEditProfile();

  const handleOpenEditDrawer = () => {
    openDrawer("PERSONAL_INFO");
  };

  const { profileData } = useProfile();

  return (
    <>
      <Card className="p-6 !shadow-sm">
        <div className="flex justify-between">
          <h3 className="font-semibold">Personal Information</h3>
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
              <div className="md:max-w-[30rem]">
                <div className="opacity-70 text-sm">First Name</div>
                <div className="font-medium text-base capitalize">
                  {profileData?.user?.first_name}
                </div>
              </div>
              <div className="md:max-w-[30rem]">
                <div className="opacity-70 text-sm">Last Name</div>
                <div className="font-medium text-base capitalize">
                  {profileData?.user?.last_name}
                </div>
              </div>
              <div className="md:max-w-[30rem]">
                <div className="opacity-70 text-sm">Email Address</div>
                <div className="font-medium text-base break-all whitespace-normal">
                  {profileData?.user?.email || "N/A"}
                </div>
              </div>
              <div className="md:max-w-[30rem]">
                <div className="opacity-70 text-sm">Phone</div>
                <div className="font-medium text-base break-words">
                  {profileData?.user?.phone_number || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfilePersonalInfoView;
