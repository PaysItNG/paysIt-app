import { Chip } from "@heroui/react";
import clsx from "clsx";
import React, { ReactNode } from "react";

type ColorType = {
  tColor: string;
  bColor: string;
};

export type StatusColorType = {
  success: ColorType;
  pending: ColorType;
  error: ColorType;
};

type ChipStatusPropType = {
  status?: keyof StatusColorType; // Restrict status to keys of StatusColorType
  label?: string | ReactNode | null | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const ChipStatus: React.FC<ChipStatusPropType> = ({
  status = "pending",
  label,
  size = "sm",
  className,
  ...rest
}) => {
  const statusColor: StatusColorType = {
    success: {
      tColor: "text-green-600",
      bColor: "bg-green-100",
    },
    pending: {
      tColor: "text-orange-500/80",
      bColor: "bg-orange-100/80",
    },
    error: {
      tColor: "text-red-600",
      bColor: "bg-red-100",
    },
  };

  return (
    <>
      <Chip
        size={size}
        className={clsx(
          statusColor[status].bColor,
          statusColor[status].tColor,
          className
        )}
        classNames={{
          content: "font-semibold text-xs",
        }}
        {...rest}
      >
        {label}
      </Chip>
    </>
  );
};

export default ChipStatus;
