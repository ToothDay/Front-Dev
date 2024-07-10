import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: true,
  openModal: () => {
    set({ isOpen: true });
  },
  closeModal: () => {
    set({ isOpen: false });
  }
}));
