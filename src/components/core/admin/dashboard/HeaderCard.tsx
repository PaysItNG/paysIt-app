"use client";

import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Card } from "@heroui/react";
import React, { createElement, ElementType } from "react";

type PropType = {
  label: string;
  icon: ElementType;
  value: string | number;
  isCurrency?: boolean;
};

const HeaderCard: React.FC<PropType> = ({
  label,
  icon,
  value = "",
  isCurrency,
}) => {
  return (
    <Card className="p-5 rounded-xl shadow-none fle justify-between flex-wrap dark:bg-[#27272a] dark:border-[#27272a]">
      <div>
        <h5 className="font-medium mb-2 dark:text-white text-black">{label}</h5>
        <div className="flex justify-between items-center w-full">
          <div className="h-14 w-14 bg-green-100 p-2 rounded-full flex items-center justify-center">
            {/* <FaBusinessTime className="text-blue-500" size={25} /> */}
            {createElement(icon, {
              size: 25,
              className: "text-primary",
            })}
          </div>
          <p className="text-xl font-bold dark:text-white text-black">
            {isCurrency ? formatCurrency(value) : value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HeaderCard;
