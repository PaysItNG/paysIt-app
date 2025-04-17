"use client";

import Button from "@/components/shared/ui/Button";
import { useProfile } from "@/hooks/use-profile";
import { APP_ROUTES } from "@/lib/routes";
import { filePrefix } from "@/lib/utils/filePrefix";
import { formatInitial } from "@/lib/utils/formatInitial";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";

const SidebarHeader = ({ role }: { role: string }) => {
  const router = useRouter();

  const { profileData } = useProfile();
  const nameInitials = formatInitial(
    profileData?.user?.first_name || "",
    profileData?.user?.last_name || ""
  );

  const gotoProfile = () => {
    if (role === "admin") {
      router.push(APP_ROUTES.ADMIN_PROFILE);
    } else if (role === "user") {
      router.push(APP_ROUTES.PROFILE);
    }
  };

  return (
    <>
      <main className="w-full bg-white shadow flex justify-end z-20 px-8 py-2">
        <div className="flex gap-5">
          <div>
            <Button isIconOnly className="bg-transparent">
              <IoIosNotifications size={20} className="text-gray-400" />
            </Button>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={gotoProfile}
          >
            <div>
              <Avatar
                src={filePrefix + profileData?.profile_picture}
                name={nameInitials}
              />
            </div>
            <p className="text-sm font-medium capitalize">
              {profileData?.user?.first_name} {profileData?.user?.last_name}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SidebarHeader;
