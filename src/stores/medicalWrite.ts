import { create } from "zustand";

type TreatmentList = {
  category: string;
  amount: number;
};

type TreatmentNumber = {
  id: number;
  number: number;
  name: string;
  isClick: boolean;
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
  updateOrAddTreatmentNumber: (
    id: number,
    name: string,
    number: number,
    isClick: boolean
  ) => void;
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
  updateOrAddTreatmentNumber: (
    id: number,
    name: string,
    number: number,
    isClick: boolean
  ) => {
    set((state) => {
      const treatmentNumber = state.treatmentNumber.find(
        (treatment) => treatment.name === name
      );
      if (treatmentNumber) {
        return {
          treatmentNumber: state.treatmentNumber.map((treatment) =>
            treatment.name === name ? { id, name, number, isClick } : treatment
          )
        };
      } else {
        return {
          treatmentNumber: [
            ...state.treatmentNumber,
            { id, name, number, isClick }
          ]
        };
      }
    });
  }
}));

useTreatmentNumber.subscribe((state) => {
  console.log("State changed:", state);
});
