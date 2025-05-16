"use client";

import Button from "@/components/shared/ui/Button";
import { useProfile } from "@/hooks/use-profile";
import { APP_ROUTES } from "@/lib/routes";
import { filePrefix } from "@/lib/utils/filePrefix";
import { formatInitial } from "@/lib/utils/formatInitial";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";
import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import { RiMenu2Fill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import LogoNameHeader from "./LogoNameHeader";
import { IoMdClose } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

const SidebarHeader = ({ role }: { role: string }) => {
  const router = useRouter();

  const { data, switchSidebar } = useManageSidebar();
  const { sideBarOpen } = data;

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

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const BarIcon = sideBarOpen
    ? isMobile
      ? IoMdClose
      : RiMenu3Fill
    : RiMenu2Fill;

  return (
    <>
      <main
        className={clsx(
          "w-full bg-white shadow flex justify-between items-center z-20 px-5 py-2"
        )}
      >
        <div className="cursor-pointer" onClick={switchSidebar}>
          <BarIcon size={25} className="transition-all text-gray-500" />
        </div>
        <div className="lg:hidden">
          <LogoNameHeader sideBarOpen={sideBarOpen} />
        </div>
        <div className="flex gap-5">
          <div>
            <Button isIconOnly className="bg-transparent">
              <IoIosNotifications size={25} className="text-gray-400" />
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
