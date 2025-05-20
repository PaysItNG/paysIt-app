"use client";
import clsx from "clsx";
import React, { useEffect } from "react";
import MenuLink from "../core/sidebar/MenuLink";
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
import useScreenSize from "@/hooks/use-screen-size";

type PropType = {
  topMenus?: MenuType[];
  bottomMenus?: MenuType[];
  role?: string;
};

const Sidebar: React.FC<PropType> = ({ role }) => {
  const { data } = useManageSidebar();
  const { sideBarOpen } = data;
  const { isMediumScreen, isSmallScreen, isLargeScreen } = useScreenSize();
  const pathname = usePathname();

  const topMenuItems = role === "admin" ? adminTopMenus : topMenus;
  const bottomMenuItems = role === "admin" ? adminBottomMenus : bottomMenus;

  const routeActive = (path: string): boolean => pathname === path;

  // Prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((isSmallScreen || isMediumScreen) && sideBarOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMediumScreen, isSmallScreen, sideBarOpen]);

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
      },
    },
    desktopOpen: {
      x: 0,
      opacity: 1,
      width: "16rem", // 64
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    desktopClosed: {
      x: 0,
      opacity: 1,
      width: "4rem", // 16
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const isMobile = isSmallScreen || isMediumScreen;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key="sidebar"
          initial={
            isMobile ? "closed" : sideBarOpen ? "desktopOpen" : "desktopClosed"
          }
          animate={
            isMobile
              ? sideBarOpen
                ? "open"
                : "closed"
              : sideBarOpen
              ? "desktopOpen"
              : "desktopClosed"
          }
          exit={isMobile ? "closed" : "desktopClosed"}
          variants={sidebarVariants}
          className={clsx(
            "bg-[#f1f1f1] h-screen fixed top-[3.6rem] lg:top-0 z-40 overflow-y-scroll",
            sideBarOpen ? "lg:w-64 w-72" : "lg:w-16 hidden lg:block"
          )}
        >
          <div className="pt-8 pb-5 flex flex-col justify-between h-screen overflow-y-auto">
            <div className="space-y-10">
              {isLargeScreen && <LogoNameHeader sideBarOpen={sideBarOpen} />}
              <div>
                <div className={clsx("space-y-5", sideBarOpen ? "mx-3" : "")}>
                  {topMenuItems.map((menu, index) =>
                    menu?.menuItem?.length ? (
                      <motion.div
                        key={index + "____top_menu"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 text-gray-500 hover:text-gray-700">
                            <div className="flex items-center gap-x-2 px-3 py-2 transition-all">
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

                          <motion.ul
                            className="mt-2 space-y-1 px-4"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {menu?.menuItem?.map((menu, index) => (
                              <li key={menu.name + "____submenu" + index}>
                                <MenuLink menu={menu} isSubmenu={true} />
                              </li>
                            ))}
                          </motion.ul>
                        </details>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={index + "____top_menu"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <MenuLink menu={menu} />
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className={clsx("space-y-5", sideBarOpen ? "mx-4" : "")}>
              {bottomMenuItems.map((menu, index) => (
                <motion.div
                  key={index + "____bottom_menu"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <MenuLink menu={menu} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
