import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

interface PropType {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}

const Backdrop: React.FC<PropType> = ({ children, onClick }) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === ref.current) onClick?.();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[99] !m-0 p-0"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
