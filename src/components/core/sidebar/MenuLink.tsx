import useManageSidebar from "@/hooks/useManageSidebar";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type MenuType = {
  menu: {
    path: string;
    name: string;
    defaultIcon: IconType;
    activeIcon: IconType;
    active?: boolean;
  };
};

const MenuLink: React.FC<MenuType> = ({ menu }) => {
  const {
    data: { sideBarOpen },
  } = useManageSidebar();

  return (
    <Link
      href={menu.path}
      className={clsx(
        "relative flex items-center gap-x-2 px-3 py-2 transition-all",
        menu.active &&
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[5px] before:h-[30px] before:bg-gradient-to-b before:from-green-700 before:to-green-300 before:rounded-full"
      )}
    >
      {/* Sidebar Closed - Show Curved Indicator */}
      {/* {!sideBarOpen && menu.active && (
        <div
          className="absolute left-[-8px] w-3 h-full bg-purple-500 rounded-md 
          before:absolute before:top-1/2 before:left-0 before:w-[12px] before:h-[30px] before:bg-purple-500 
          before:rounded-r-full before:-translate-y-1/2"
        />
      )} */}

      {React.createElement(menu.active ? menu.activeIcon : menu.defaultIcon, {
        size: 22,
        className: clsx(menu.active ? "text-green-700" : "text-[#7B7B7B]"),
      })}

      {/* Animate Menu Name (Only When Sidebar is Open) */}
      <AnimatePresence mode="wait">
        {sideBarOpen && (
          <motion.h3
            key={`${menu.name}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "text-gray-500 text-[1rem] transition-all",
              menu.active && "text-green-800 font-medium"
            )}
          >
            {menu?.name}
          </motion.h3>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default MenuLink;
