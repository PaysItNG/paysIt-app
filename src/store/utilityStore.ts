import { UtilityViews } from "@/lib/utils/typeConfig";
import { create } from "zustand";

type DataType = {
  utility_type: UtilityViews;
  currentView: string;
  [key: string]: unknown;
};

type StoreType = {
  isOpen: boolean;
  data: DataType;
  openDrawer: (data?: Record<string, unknown>) => void;
  updateData: (data?: Record<string, unknown>) => void;
  closeDrawer: () => void;
};

const initialData = {
  utility_type: "airtime" as UtilityViews,
  currentView: "initial",
};

export const useUtilityStore = create<StoreType>((set) => ({
  isOpen: false,
  data: initialData,
  openDrawer: (data) =>
    set((state) => ({ isOpen: true, data: { ...state.data, ...data } })),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  closeDrawer: () => set(() => ({ isOpen: false, data: initialData })),
}));
