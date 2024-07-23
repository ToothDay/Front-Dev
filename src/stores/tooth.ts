import { create } from "zustand";

type ToothState = {
  saveTooth: number[];
  setSaveTooth: (tooth: number[]) => void;
};

export const useToothStore = create<ToothState>((set) => ({
  saveTooth: [],
  setSaveTooth: (saveTooth: number[]) => set({ saveTooth })
}));

useToothStore.subscribe((state) => console.log("New state", state));
