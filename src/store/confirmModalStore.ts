import { create } from "zustand";

type DataType = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  cancelText?: string | React.ReactNode | Element;
  okText?: string | React.ReactNode | Element;
  cancelButtonProps?: {
    [key: string]: unknown;
  };
  okButtonProps?: {
    [key: string]: unknown;
  };
  onOk: () => void;
  onCancel?: () => void;
  [key: string]: unknown;
};

type ConfirmModalStoreType = {
  data: DataType;
  isOpen: boolean;
  openConfirm: (data: DataType) => void;
  closeConfirm: () => void;
};

export const useConfirmModal = create<ConfirmModalStoreType>((set) => ({
  isOpen: false,
  data: {
    title: "",
    okText: "Confirm",
    cancelText: "Cancel",
    onOk: () => {},
  },
  openConfirm: (data) =>
    set((state) => ({ data: { ...state.data, ...data }, isOpen: true })),
  closeConfirm: () =>
    set((state) => ({ data: { ...state.data }, isOpen: false })),
}));
