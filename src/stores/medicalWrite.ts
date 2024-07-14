import { create } from "zustand";

type TreatmentList = {
  category: string;
  amount: number;
};

type TreatmentNumber = {
  number: number;
  name: string;
};

type MedicalWriteState = {
  dentistId: number;
  visitDate: string;
  treatmentList: TreatmentList[];
  isShared: boolean;
  updateDentistId: (dentistId: number) => void;
  updateVisitDate: (visitDate: string) => void;
  updateTreatmentList: (treatmentList: TreatmentList[]) => void;
  updateIsShared: (isShared: boolean) => void;
};

type TreatmentNumberList = {
  treatmentNumber: TreatmentNumber[];
  updateOrAddTreatmentNumber: (name: string, number: number) => void;
};

export const useMedicalWriteStore = create<MedicalWriteState>((set) => ({
  dentistId: 0,
  visitDate: "",
  treatmentList: [],
  isShared: false,
  updateDentistId: (dentistId: number) => {
    set({ dentistId });
  },
  updateVisitDate: (visitDate: string) => {
    set({ visitDate });
  },
  updateTreatmentList: (treatmentList: TreatmentList[]) => {
    set({ treatmentList });
  },
  updateIsShared: (isShared: boolean) => {
    set({ isShared });
  }
}));

export const useTreatmentNumber = create<TreatmentNumberList>((set) => ({
  treatmentNumber: [],
  updateOrAddTreatmentNumber: (name: string, number: number) => {
    if (number === 0) return;
    set((state) => {
      const treatmentNumber = state.treatmentNumber.find(
        (treatment) => treatment.name === name
      );
      if (treatmentNumber) {
        return {
          treatmentNumber: state.treatmentNumber.map((treatment) =>
            treatment.name === name ? { name, number } : treatment
          )
        };
      } else {
        return {
          treatmentNumber: [...state.treatmentNumber, { name, number }]
        };
      }
    });
  }
}));

useTreatmentNumber.subscribe((state) => {
  console.log("State changed:", state);
});
