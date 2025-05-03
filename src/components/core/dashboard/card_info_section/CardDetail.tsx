"use client";
import Button from "@/components/shared/ui/Button";
import Title from "@/components/shared/ui/Title";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CardDetail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Title
          title="Card Information"
          classNames={{
            title: "text-base font-medium",
          }}
        />
        <Button
          isIconOnly
          onPress={() => setVisible(!visible)}
          size="sm"
          className="bg-transparent"
          disableRipple={true}
        >
          {visible ? (
            <IoEye size={20} className="text-default-400" />
          ) : (
            <IoEyeOff size={20} className="text-default-400" />
          )}
        </Button>
      </div>

      <div className="rounded-lg bg-white p-4 w-full">
        <div className="grid grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-xs">Card Name</p>
              <h4 className="font-medium text-sm">
                {visible ? "John Fixit" : "**** ****"}
              </h4>
            </div>
            <div>
              <p className="text-gray-500 text-xs">CVV</p>
              <h4 className="font-medium text-sm">{visible ? "039" : "***"}</h4>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-xs">Card No</p>
              <h4 className="font-medium text-sm">******** 1902</h4>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Valid Until</p>
              <h4 className="font-medium text-sm">
                {visible ? "05/27" : "****"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
