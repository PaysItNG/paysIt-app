
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLayoutDashboardFilled } from "react-icons/tb";

import { IoSettings } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import { IoWallet } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

import { AiOutlineLogout } from "react-icons/ai";

import { IconType } from "react-icons";

type MenuType = {
  path: string;
  name: string;
  defaultIcon: IconType;
  activeIcon: IconType;
  active?: boolean;
}[];

export const topMenus: MenuType = [
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

export const bottomMenus: MenuType = [
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