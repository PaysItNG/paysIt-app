import { Select as HeroSelect } from "@heroui/react";
import type { ComponentProps } from "react";

type HeroInputProps = ComponentProps<typeof HeroSelect>;

const Select = ({ classNames = {}, ...rest }: HeroInputProps) => {
  return (
    <>
      <HeroSelect
        {...rest}
        classNames={{
          ...classNames, // Preserve any existing classNames
          innerWrapper: `border border-zinc-300 outline-none shadow-none transition ${
            classNames?.innerWrapper || ""
          }`,
        }}
      />
    </>
  );
};

export default Select;
