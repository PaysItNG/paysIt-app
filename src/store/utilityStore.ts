import { UtilityViews } from "@/lib/utils/typeConfig";
import { create } from "zustand";

type DataType = {
  utility_type: UtilityViews;
  [key: string]: unknown;
};

type StoreType = {
  isOpen: boolean;
  data: DataType;
  openDrawer: (data?: Record<string, unknown>) => void;
  closeDrawer: () => void;
};

export const useUtilityStore = create<StoreType>((set) => ({
  isOpen: false,
  data: {
    utility_type: "airtime" as UtilityViews,
  },
  openDrawer: (data) =>
    set((state) => ({ isOpen: true, data: { ...state.data, ...data } })),
  closeDrawer: () =>
    set((state) => ({ isOpen: false, data: { ...state.data } })),
}));
