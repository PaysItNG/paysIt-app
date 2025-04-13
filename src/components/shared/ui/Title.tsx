"use client";
import { Button, cn } from "@heroui/react";
import { ReactNode } from "react";
import { HiChevronLeft } from "react-icons/hi";

type TitleProps = {
  title?: string;
  sub?: string | ReactNode;
  className?: string;
  classNames?: {
    base?: string;
    sub?: string;
    title?: string;
  };
  onBack?: () => void;
  isDisabled?: boolean;
};

const Title = ({
  title,
  sub,
  className,
  classNames = {},
  onBack,
  isDisabled,
}: TitleProps) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-4",
        className,
        classNames.base || ""
      )}
    >
      {!!onBack && (
        <Button
          onPress={onBack}
          variant="bordered"
          radius="full"
          isIconOnly
          size="sm"
          isDisabled={isDisabled}
        >
          <HiChevronLeft size="20" />
        </Button>
      )}
      <div>
        <h2
          className={cn(
            "text-2xl font-medium leading-none",
            classNames.title || ""
          )}
        >
          {title}
        </h2>
        {!!sub && (
          <p
            className={cn(
              "opacity-75 leading-none mt-1.5",
              classNames.sub || ""
            )}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};

export default Title;
