import { create } from "zustand";

type TreatmentList = {
  category: string;
  amount: number;
};

type TreatmentType = {
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

type TreatmentTypeList = {
  treatmentType: TreatmentType[];
  updateOrAddTreatmentType: (
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

export const useTreatmentType = create<TreatmentTypeList>((set) => ({
  treatmentType: [],
  updateOrAddTreatmentType: (
    id: number,
    name: string,
    number: number,
    isClick: boolean
  ) => {
    set((state) => {
      const treatmentType = state.treatmentType.find(
        (treatment) => treatment.name === name
      );
      if (treatmentType) {
        if (number === 0) {
          return {
            treatmentType: state.treatmentType.filter(
              (treatment) => treatment.name !== name
            )
          };
        } else {
          return {
            treatmentType: state.treatmentType.map((treatment) =>
              treatment.name === name
                ? { id, name, number, isClick }
                : treatment
            )
          };
        }
      } else {
        if (number > 0) {
          return {
            treatmentType: [
              ...state.treatmentType,
              { id, name, number, isClick }
            ]
          };
        } else {
          return {
            treatmentType: state.treatmentType
          };
        }
      }
    });
  }
}));

useTreatmentType.subscribe((state) => {
  console.log("State changed:", state);
});
