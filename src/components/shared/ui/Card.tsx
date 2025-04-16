import clsx from "clsx";
import { FC, ReactNode } from "react";

type PropType = {
  className?: string;
  children: ReactNode;
  hover?: boolean;
};

const Card: FC<PropType> = ({
  className,
  children,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-white shadow border rounded-[1.2rem] transition-all duration-300",
        className,
        {
          "hover:scale-[1.01] hover:-translate-y-1 cursor-pointer": hover,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
