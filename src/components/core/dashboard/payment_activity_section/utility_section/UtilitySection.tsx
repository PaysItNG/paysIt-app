"use client";
import Title from "@/components/shared/ui/Title";
import { Avatar } from "@heroui/react";
import React, { useCallback } from "react";
import { MdOutlineSimCard } from "react-icons/md";
import { MdOutlineElectricBolt } from "react-icons/md";
import { MdSignalCellularAlt } from "react-icons/md";
import { FaTv } from "react-icons/fa6";
import { IconType } from "react-icons";
import { useUtilityStore } from "@/store/utilityStore";

const UtilitySection = () => {
  //========utility drawer store============
  const { openDrawer } = useUtilityStore();
  //==============

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

  type UtilityType = {
    name: string;
    icon: IconType;
    key: string;
  };

  const utilities: UtilityType[] = [
    { name: "Airtime", icon: MdOutlineSimCard, key: "airtime" },
    { name: "Data", icon: MdSignalCellularAlt, key: "data" },
    { name: "Cable", icon: FaTv, key: "cable" },
    { name: "Electricity", icon: MdOutlineElectricBolt, key: "electricity" },
  ];

  const handleOpenUtilityDrawer = (utility: UtilityType) => {
    openDrawer({ utility_type: utility.key });
  };

  return (
    <div className="space-y-5 lg:block flex flex-col items-center">
      <Title
        title="Quick Top-up"
        classNames={{
          title: "text-base font-medium",
        }}
      />
      <div className="flex gap-8 lg:gap-3 lg:px-0 px-5">
        {utilities?.map((it, index) => (
          <div
            key={index + "_____avatar"}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => handleOpenUtilityDrawer(it)}
          >
            <Avatar
              classNames={{
                base: "p-2.5",
                img: "rounded-full",
                icon: "rounded-full text-white",
              }}
              icon={<it.icon size={25} color="white" />}
              size="lg"
              style={{
                backgroundColor: avatarColor(index),
                color: "white",
                fontWeight: 600,
              }}
            />
            <p className="text-sm">{it.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilitySection;
