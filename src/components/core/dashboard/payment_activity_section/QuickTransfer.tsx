"use client";
import Title from "@/components/shared/ui/Title";
import { Avatar } from "@heroui/react";
import React, { useCallback } from "react";
import { IoMdAdd } from "react-icons/io";

const QuickTransfer = () => {
  const avatarColor = useCallback((id: number) => {
    const colors = [
      "#166534",
      "#F06292",
      "#7986CB",
      "#FF6B6B",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#4ECDC4",
      "#9575CD",
    ];
    return colors[id % colors.length];
  }, []);

  return (
    <div className="space-y-5 lg:block flex flex-col items-center">
      <Title
        title="Quick transfer"
        classNames={{
          title: "text-base font-medium",
        }}
      />
      <div className="flex gap-8 lg:gap-3 lg:px-0 px-5">
        {[1, 2, 3].map((it, index) => (
          <div key={index + "_____avatar"}>
            <Avatar
              classNames={{
                base: "p-2.5",
                img: "rounded-full",
                icon: "rounded-full",
              }}
              size="lg"
              style={{
                backgroundColor: avatarColor(it),
                color: "white",
                fontWeight: 600,
              }}
              src={`https://i.pravatar.cc/150?img=${index}`}
            />
          </div>
        ))}
        <div className="">
          <Avatar
            classNames={{
              base: "p-3 border-2 border-dashed border-default-200 bg-transparent cursor-pointer",
              img: "rounded-full",
              icon: "rounded-full",
            }}
            size="lg"
            style={{
              fontWeight: 600,
            }}
            icon={<IoMdAdd size={30} color="gray" />}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
