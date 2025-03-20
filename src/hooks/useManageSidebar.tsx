import { create } from "zustand";

type SidebarState = {
  sideBarOpen: boolean;
};

type SidebarStore = {
  data: SidebarState;
  switchSidebar: () => void;
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
}));

export default useManageSidebar;
