import { create } from "zustand";

type DataType = {
  transaction_type?: string;
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
  transaction_type: "send",
};

export const useSendOrDepositStore = create<StoreType>((set) => ({
  isOpen: false,
  data: initialData,
  openDrawer: (data) =>
    set((state) => ({ isOpen: true, data: { ...state.data, ...data } })),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  closeDrawer: () => set(() => ({ isOpen: false, data: initialData })),
}));
