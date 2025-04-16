"use client";

// import Button from "@/components/shared/ui/Button";
import Card from "@/components/shared/ui/Card";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import React, { FC } from "react";
// import { GoPencil } from "react-icons/go";

type PropType = {
  title?: string;
  data: {
    label: string;
    value: string | number | null;
    isMoney?: boolean;
    [key: string]: unknown;
  }[];
};

const CustomDetailView: FC<PropType> = ({ title, data }) => {
  return (
    <>
      <Card className="p-6 !shadow-sm">
        <div className="flex justify-between">
          <h3 className="font-semibold">{title}</h3>
          {/* <div>
            <Button
              size="lg"
              radius="full"
              variant="bordered"
              startContent={<GoPencil size={20} />}
            >
              Edit
            </Button>
          </div> */}
        </div>
        <div>
          <div className="space-y-4">
            {data?.map((item, index) => (
              <div
                key={index + "___custom_detail_view" + item.label}
                className="grid gap-1 md:grid-cols-[1.5fr_3fr]"
              >
                <div className="opacity-70">{item.label}</div>
                <div className="font-medium text-base">
                  {item.isMoney ? formatCurrency(item.value) : item.value}
                </div>
              </div>
            ))}
            <div className="grid gap-1 md:grid-cols-[1.5fr_3fr]">
              <div className="opacity-70">Account Name</div>
              <div className="font-medium text-base">{""}</div>
            </div>
            <div className="grid gap-1 md:grid-cols-[1.5fr_3fr]">
              <div className="opacity-70">Account Name</div>
              <div className="font-medium text-base">{""}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CustomDetailView;
