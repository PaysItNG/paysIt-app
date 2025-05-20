import Image from "next/image";
import paysIt_logo from "@/assets/images/paysIt_logo.jpeg";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
// import useScreenSize from "@/hooks/use-screen-size";

type PropType = {
  sideBarOpen: boolean;
};

const LogoNameHeader: React.FC<PropType> = ({ sideBarOpen }) => {
  //large screen size
  // const { isLargeScreen } = useScreenSize();
  return (
    <div
      className={clsx(
        "flex gap-x-2 items-center px-3",
        !sideBarOpen && "justify-center"
      )}
    >
      {/* Logo Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="w-10 h-10"
      >
        <Image
          src={paysIt_logo}
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </motion.div>

      {/* Animated Text */}
      {/* <AnimatePresence mode="wait">
        {(!isLargeScreen || sideBarOpen) && (
          <motion.div
            key="logo_name"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className=""
          >
            <Link
              href={""}
              className="font-extrabold font-sans text-green-800 text-3xl"
            >
              PAYSIT
            </Link>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default LogoNameHeader;
