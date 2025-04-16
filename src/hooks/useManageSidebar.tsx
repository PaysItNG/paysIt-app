import { create } from "zustand";

type SidebarState = {
  sideBarOpen: boolean;
};

type SidebarStore = {
  data: SidebarState;
  switchSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const defaultState = {
  sideBarOpen: true,
};

const useManageSidebar = create<SidebarStore>((set) => ({
  data: defaultState,

  switchSidebar: () =>
    set((state) => ({
      data: { ...state.data, sideBarOpen: !state.data.sideBarOpen },
    })),
  openSidebar: () =>
    set((state) => ({
      data: { ...state.data, sideBarOpen: true },
    })),
  closeSidebar: () =>
    set((state) => ({
      data: { ...state.data, sideBarOpen: false },
    })),
}));

export default useManageSidebar;
