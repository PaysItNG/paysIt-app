import { create } from "zustand";

type DataType = {
  isOpen: boolean;
  [key: string]: unknown;
};

type StoreType = {
  data: DataType;
  openDrawer: (data?: Record<string, unknown>) => void;
  closeDrawer: () => void;
};

export const useViewKycDetailStore = create<StoreType>((set) => ({
  data: {
    isOpen: false,
  },
  openDrawer: (data) =>
    set((state) => ({ data: { ...state.data, isOpen: true, ...data } })),
  closeDrawer: () =>
    set((state) => ({ data: { ...state.data, isOpen: false } })),
}));
