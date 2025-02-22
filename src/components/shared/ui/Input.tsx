import { Input as HeroInput } from "@heroui/react";
import type { ComponentProps } from "react";

type HeroInputProps = ComponentProps<typeof HeroInput>;

const Input = ({ classNames = {}, ...rest }: HeroInputProps) => {
  return (
    <>
      <HeroInput
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

export default Input;
