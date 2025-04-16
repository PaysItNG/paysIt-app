"use client";
import clsx from "clsx";
import React from "react";
import MenuLink from "../core/sidebar/MenuLink";
import SidebarSwitch from "../core/sidebar/SidebarSwitch";
import {
  adminBottomMenus,
  adminTopMenus,
  bottomMenus,
  MenuType,
  topMenus,
} from "@/lib/utils/sidebarMenus";
import LogoNameHeader from "../core/sidebar/LogoNameHeader";
import useManageSidebar from "@/hooks/useManageSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PropType = {
  topMenus?: MenuType[];
  bottomMenus?: MenuType[];
  role?: string;
};

const Sidebar: React.FC<PropType> = ({ role }) => {
  const { data, openSidebar } = useManageSidebar();
  const { sideBarOpen } = data;

  const topMenuItems = role === "admin" ? adminTopMenus : topMenus;
  const bottomMenuItems = role === "admin" ? adminBottomMenus : bottomMenus;

  const pathname = usePathname();

  const routeActive = (path: string): boolean => pathname === path;

  const handleMouseEnter = () => {
    if (!sideBarOpen) {
      console.log("Hovered");
      openSidebar();
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key="sidebar"
          initial={{ opacity: 0, x: -50 }} // Start off-screen
          animate={{ opacity: 1, x: 0 }} // Animate to visible
          exit={{ opacity: 0, x: -50 }} // Exit animation
          transition={{ duration: 0.3 }}
          className={clsx(
            "bg-[#f1f1f1] min-h-screen rounded-r-2xl fixed md:relativ transition-all z-20",
            sideBarOpen ? "w-64" : "w-16"
          )}
          onMouseEnter={handleMouseEnter}
        >
          <SidebarSwitch />

          <div className="pt-8 pb-5 flex flex-col justify-between h-screen">
            <div className="space-y-10">
              <LogoNameHeader sideBarOpen={sideBarOpen} />
              <div>
                <div
                  className={clsx("space-y-5", sideBarOpen ? "md:mx-4" : "")}
                >
                  {topMenuItems.map((menu, index) =>
                    menu?.menuItem?.length ? (
                      <details
                        key={index + "____top_menu"}
                        className="group [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 text-gray-500 hover:text-gray-700">
                          <div className=" flex items-center gap-x-2 px-3 py-2 transition-all">
                            {React.createElement(
                              routeActive(menu.path)
                                ? menu.activeIcon
                                : menu.defaultIcon,
                              {
                                size: 22,
                                className: clsx(
                                  routeActive(menu.path)
                                    ? "text-green-700"
                                    : "text-[#7B7B7B]"
                                ),
                              }
                            )}

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
                          </div>

                          {/* <MenuLink menu={menu} /> */}

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          {menu?.menuItem?.map((menu, index) => (
                            <li key={menu.name + "____submenu" + index}>
                              <MenuLink menu={menu} isSubmenu={true} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <MenuLink key={index + "____top_menu"} menu={menu} />
                    )
                  )}
                </div>
              </div>
            </div>
            <div className={clsx("space-y-5", sideBarOpen ? "md:mx-4" : "")}>
              {bottomMenuItems.map((menu, index) => (
                <MenuLink key={index + "____bottom_menu"} menu={menu} />
              ))}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
