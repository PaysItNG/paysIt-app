"use client";

import Button from "@/components/shared/ui/Button";
import React from "react";
import { TbArrowDownToArc } from "react-icons/tb";
import { TbArrowDownFromArc } from "react-icons/tb";

const SendOrReceiveActionView = () => {
  return (
    <div className="flex gap-4">
      <div>
        <Button
          variant="solid"
          className="bg-black text-white text-sm"
          radius="md"
          size="lg"
          fullWidth
          endContent={<TbArrowDownToArc size={16} />}
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
          endContent={<TbArrowDownFromArc size={16} />}
        >
          Receive
        </Button>
      </div>
    </div>
  );
};

export default SendOrReceiveActionView;
