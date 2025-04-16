"use client";

import Button from "@/components/shared/ui/Button";
import { APP_ROUTES } from "@/lib/routes";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";

const AdminHeader = () => {
  const router = useRouter();

  const gotoProfile = () => {
    router.push(APP_ROUTES.ADMIN_PROFILE);
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
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </div>
            <p className="text-sm font-medium">John Fixit</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminHeader;
