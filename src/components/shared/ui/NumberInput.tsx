import { NumberInput as HeroNumberInput } from "@heroui/react";
import type { ComponentProps } from "react";

type HeroNumberInputProps = ComponentProps<typeof HeroNumberInput>;

const NumberInput = ({ classNames = {}, ...rest }: HeroNumberInputProps) => {
  return (
    <>
      <HeroNumberInput
        {...rest}
        classNames={{
          ...classNames, // Preserve any existing classNames
          inputWrapper: `border border-zinc-300 outline-none shadow-none transition ${
            classNames?.inputWrapper || ""
          }`,
        }}
      />
    </>
  );
};

export default NumberInput;
