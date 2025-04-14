
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLayoutDashboardFilled } from "react-icons/tb";

import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import { IoWallet } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

import { AiOutlineLogout } from "react-icons/ai";

import { IconType } from "react-icons";

export type MenuType = {
  path: string;
  name: string;
  defaultIcon: IconType;
  activeIcon: IconType;
  active?: boolean;
  menuItem?: {
    path: string;
    name: string;
    defaultIcon: IconType;
    activeIcon: IconType;
  }[];
};

export const topMenus: MenuType[] = [
  {
    path: "",
    name: "Dashboard",
    defaultIcon: LuLayoutDashboard,
    activeIcon: TbLayoutDashboardFilled,
    active: true,
  },
  {
    path: "",
    name: "Wallet",
    defaultIcon: IoWalletOutline,
    activeIcon: IoWallet,
    active: false,
  },
];

export const bottomMenus: MenuType[] = [
  {
    path: "",
    name: "Setting",
    defaultIcon: IoSettingsOutline,
    activeIcon: IoSettings,
    active: false,
  },
  {
    path: "",
    name: "Logout",
    defaultIcon: AiOutlineLogout,
    activeIcon: AiOutlineLogout,
  },
];
export const adminTopMenus: MenuType[] = [
  {
    path: "",
    name: "Dashboard",
    defaultIcon: LuLayoutDashboard,
    activeIcon: TbLayoutDashboardFilled,
    active: true,
  },
  {
    path: "",
    name: "Account Approval",
    defaultIcon: IoWalletOutline,
    activeIcon: IoWallet,
    active: false,
    menuItem: [
        {
          path: "",
          name: "KYC Approval",
          defaultIcon: LuLayoutDashboard,
          activeIcon: TbLayoutDashboardFilled,
        }
    ]
  },
];

export const adminBottomMenus: MenuType[] = [
  {
    path: "",
    name: "Logout",
    defaultIcon: AiOutlineLogout,
    activeIcon: AiOutlineLogout,
  },
];