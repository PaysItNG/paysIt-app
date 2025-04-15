"use client";

import Button from "@/components/shared/ui/Button";
import { Avatar } from "@heroui/react";
import { IoIosNotifications } from "react-icons/io";

const AdminHeader = () => {
  return (
    <>
      <main className="w-full bg-white shadow flex justify-end z-20 px-8 py-2">
        <div className="flex gap-5">
          <div>
            <Button isIconOnly className="bg-transparent">
              <IoIosNotifications size={20} className="text-gray-400" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <p>John Fixit</p>
            <div>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminHeader;
