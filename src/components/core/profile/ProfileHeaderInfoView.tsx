"use client";

import Button from "@/components/shared/ui/Button";
import Card from "@/components/shared/ui/Card";
import ChipStatus from "@/components/shared/ui/ChipStatus";
import { useProfile } from "@/hooks/use-profile";
import { RankIcon } from "@/lib/design/svgIcons";
import { filePrefix } from "@/lib/utils/filePrefix";
import { formatInitial } from "@/lib/utils/formatInitial";
import { useEditProfile } from "@/store/editProfile";
import { Avatar, Badge } from "@heroui/react";
import React from "react";
import { GoPencil } from "react-icons/go";

const ProfileHeaderInfoView = () => {
  const { openDrawer } = useEditProfile();

  const { profileData } = useProfile();

  const handleOpenEditDrawer = () => {
    openDrawer("PERSONAL_INFO");
  };

  const nameInitials = formatInitial(
    profileData?.user?.first_name || "",
    profileData?.user?.last_name || ""
  );

  return (
    <Card className="p-6 flex justify-between items-center gap-4 !shadow-sm">
      <div className="flex gap-x-3 items-center">
        <div>
          <Badge
            placement="bottom-right"
            className="bg-orange-100 border-1 border-orange-100 text-orange-400 py-[0.15rem] px-[0.3rem]"
            content={
              <div className="flex capitalize items-center text-xs">
                <RankIcon color="orange" /> {profileData?.tier || ""}
              </div>
            }
          >
            <Avatar
              className="w-28 h-28 text-4xl shadow"
              src={
                profileData?.profile_picture
                  ? filePrefix + profileData?.profile_picture
                  : ""
              }
              name={nameInitials}
              classNames={{
                base: ["bg-green-100"],
                name: ["font-bold uppercase", "text-primary"],
              }}
            />
          </Badge>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold capitalize">
            {profileData?.user?.first_name} {profileData?.user?.last_name}
          </h3>
          <div className="space-x-2">
            <ChipStatus
              status={profileData?.user?.is_active ? "success" : "pending"}
              label={
                profileData?.user?.is_active
                  ? "Account activated"
                  : "Account not activated"
              }
              size="md"
            />
          </div>
        </div>
      </div>
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
    </Card>
  );
};

export default ProfileHeaderInfoView;
