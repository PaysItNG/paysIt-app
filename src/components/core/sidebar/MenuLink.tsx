// import useManageSidebar from "@/hooks/useManageSidebar";
// import clsx from "clsx";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import React from "react";
// import { IconType } from "react-icons";

// type MenuType = {
//   menu: {
//     path: string;
//     name: string;
//     defaultIcon: IconType;
//     activeIcon: IconType;
//     active?: boolean;
//   };
// };

// const MenuLink: React.FC<MenuType> = ({ menu }) => {
//   const {
//     data: { sideBarOpen },
//   } = useManageSidebar();

//   return (
//     <Link
//       href={menu.path}
//       className={clsx(
//         "relative flex items-center gap-x-2 px-3 py-2 transition-all",
//         menu.active &&
//           "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[5px] before:bg-gradient-to-b before:from-green-700 before:to-green-300 before:rounded-full",
//         !sideBarOpen && "justify-center"
//       )}
//     >
//       {React.createElement(menu.active ? menu.activeIcon : menu.defaultIcon, {
//         size: 22,
//         className: clsx(menu.active ? "text-green-700" : "text-[#7B7B7B]"),
//       })}

//       {/* Animate Menu Name (Only When Sidebar is Open) */}
//       <AnimatePresence mode="wait">
//         {sideBarOpen && (
//           <motion.h3
//             key={`${menu.name}`}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -10 }}
//             transition={{ duration: 0.2 }}
//             className={clsx(
//               "text-gray-500 text-[1rem] transition-all",
//               menu.active && "text-green-800 font-medium"
//             )}
//           >
//             {menu?.name}
//           </motion.h3>
//         )}
//       </AnimatePresence>
//     </Link>
//   );
// };

// export default MenuLink;

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
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[5px] before:bg-gradient-to-b before:from-green-700 before:to-green-300 before:rounded-full",
        !sideBarOpen && "justify-center"
      )}
    >
      {/* Active Indicator with Curved Shape */}
      {menu.active && (
        <span
          className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-green-700 to-green-400"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%, 0 0)",
          }}
        />
      )}

      {/* Icon */}
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
            className="text-gray-500 text-[1rem] transition-all"
          >
            {menu?.name}
          </motion.h3>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default MenuLink;
