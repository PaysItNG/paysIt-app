import { create } from "zustand";

type DataType = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  cancelButtonProps?: {
    [key: string]: unknown;
  };
  okButtonProps?: {
    [key: string]: unknown;
  };
  onOk?: () => void;
  onCancel?: () => void;
  [key: string]: unknown;
};

type ConfirmModalStoreType = {
  data: DataType;
  isOpen: boolean;
  openConfirm: (data: DataType) => void;
  updateData: (data: Record<string, unknown>) => void;
  closeConfirm: () => void;
};

export const useConfirmModal = create<ConfirmModalStoreType>((set) => ({
  isOpen: false,
  data: {
    title: "",
  },
  openConfirm: (data) =>
    set((state) => ({ data: { ...state.data, ...data }, isOpen: true })),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  closeConfirm: () => set(() => ({ data: { title: "" }, isOpen: false })),
}));
