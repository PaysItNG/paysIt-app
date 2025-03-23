"use client";

import { Button } from "@heroui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import clsx from "clsx";

type PropTypes = {
  name: string;
  type: string;
  amount: unknown;
};

const FinancialOverviewCard: React.FC<PropTypes> = ({ name, type, amount }) => {
  return (
    <>
      <main
        className={clsx(
          "relative rounded-2xl bg-white shadow p-5 space-y-2 before:absolute before:left-0 before:top-5 before:bottom-0 before:w-[5px] before:rounded-r-full before:h-2/6",
          type === "earning" ? "before:bg-green-700" : "before:bg-red-500"
        )}
      >
        <div className="flex justify-between">
          <p className="text-gray-500 text-[0.9rem] font-medium">{name}</p>
          <Button isIconOnly className="bg-white" size="sm">
            <BsThreeDots className="text-gray-500" size={20} />
          </Button>
        </div>
        <div>
          <h3 className="text-black text-2xl font-semibold">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div className="flex gap-x-1 items-center">
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            radius="full"
            className="cursor-auto"
            color={type === "earning" ? "primary" : "danger"}
          >
            {type === "earning" ? (
              <GoArrowUpRight size={16} />
            ) : (
              <GoArrowDownRight size={16} />
            )}
          </Button>
          <p>12%</p>
        </div>
      </main>
    </>
  );
};

export default FinancialOverviewCard;
