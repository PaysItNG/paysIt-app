"use client";
import Button from "@/components/shared/ui/Button";
import Title from "@/components/shared/ui/Title";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CardDetail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex justify-between">
      <Title
        title="Monthly Payment"
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
  );
};

export default CardDetail;
