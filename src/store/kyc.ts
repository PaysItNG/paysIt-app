import { create } from "zustand";

type DataType = {
  currentStep: number;
  isOpen: boolean;
  [key: string]: unknown;
};
type StoreType = {
  data: DataType;
  onOpenDrawer: () => void;
  updateData: (newData: { [key: string]: unknown }) => void;
  onCloseDrawer: () => void;
  changeStep: (step: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const initialValues = {
  currentStep: 0,
  isOpen: false,
};

export const usekYCStore = create<StoreType>()((set, get) => ({
  data: initialValues,
  onOpenDrawer: () =>
    set((state) => ({ data: { ...state.data, isOpen: true } })),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  onCloseDrawer: () =>
    set((state) => ({ data: { ...state.data, isOpen: false } })),
  changeStep: (step) =>
    set((state: { data: DataType }) => ({ data: { ...state.data, step } })),
  onPrev: () =>
    set((state) => ({
      data: {
        ...state.data,
        currentStep:
          state.data.currentStep < 1 ? 0 : get().data.currentStep - 1,
      },
    })),
  onNext: () =>
    set((state) => ({
      data: { ...state.data, currentStep: get().data.currentStep + 1 },
    })),
}));
