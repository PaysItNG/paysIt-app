"use client";

import Button from "@/components/shared/ui/Button";
import { useSendOrDepositStore } from "@/store/sendOrDepositStore";
import React from "react";
import { TbArrowDownToArc } from "react-icons/tb";
import { TbArrowDownFromArc } from "react-icons/tb";

const SendOrReceiveActionView = () => {
  const { openDrawer } = useSendOrDepositStore();

  const handleClick = (type: string) => {
    openDrawer({
      transaction_type: type,
    });
  };

  return (
    <div className="flex gap-4 justify-center">
      <div>
        <Button
          variant="solid"
          className="bg-black text-white text-sm"
          radius="md"
          size="lg"
          fullWidth
          endContent={<TbArrowDownFromArc size={16} />}
          onPress={() => handleClick("send")}
        >
          Send
        </Button>
      </div>
      <div>
        <Button
          variant="solid"
          className="bg-black text-white text-sm"
          radius="md"
          size="lg"
          fullWidth
          endContent={<TbArrowDownToArc size={16} />}
          onPress={() => handleClick("deposit")}
        >
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default SendOrReceiveActionView;
