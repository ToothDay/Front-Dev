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

export type CostList = {
  id: number;
  name: string;
  value: string;
};

export type CostType = {
  id: number;
  category: string;
  amount: number;
  toothId: number;
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

type TreatmentCost = {
  treatmentCostList: CostList[];
  updateTreatmentCost: (treatmentCostList: CostList[]) => void;
};

type CostTypeList = {
  selectedCost: CostType[];
  updateSelectedCost: (selectedCost: CostType[]) => void;
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
        return {
          treatmentType:
            number === 0
              ? state.treatmentType.filter(
                  (treatment) => treatment.name !== name
                )
              : state.treatmentType.map((treatment) =>
                  treatment.name === name
                    ? { id, name, number, isClick }
                    : treatment
                )
        };
      } else {
        return {
          treatmentType:
            number > 0
              ? [...state.treatmentType, { id, name, number, isClick }]
              : state.treatmentType
        };
      }
    });
  }
}));

export const useTreatmentCost = create<TreatmentCost>((set) => ({
  treatmentCostList: [],
  updateTreatmentCost: (treatmentCostList: CostList[]) => {
    set({ treatmentCostList });
  }
}));

export const useCostList = create<CostTypeList>((set) => ({
  selectedCost: [],
  updateSelectedCost: (selectedCost: CostType[]) => {
    set({ selectedCost });
  }
}));
