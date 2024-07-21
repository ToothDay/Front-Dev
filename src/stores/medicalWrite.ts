import { VisitDetail } from "@/api/medical";
import { create } from "zustand";

export type TreatmentList = {
  category: string;
  amount: number;
  toothId?: number | null | undefined;
};

export type TreatmentType = {
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

type ModifyDataState = {
  visitId: number;
  dentistId: number;
  dentistName: string;
  dentistAddress: string;
  visitDate: string;
  isShared: boolean;
  treatmentList: TreatmentList[];
  totalAmount: number;
  writtenByCurrentUser: boolean;
  setModifyData: (data: Partial<ModifyDataState>) => void;
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
  clearTreatmentType: () => void;
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
  isShared: true,
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
  },
  clearTreatmentType: () => {
    set({ treatmentType: [] });
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

export const useModifyData = create<ModifyDataState>((set) => ({
  visitId: 0,
  dentistId: 0,
  dentistName: "",
  dentistAddress: "",
  visitDate: "",
  isShared: true,
  treatmentList: [],
  totalAmount: 0,
  writtenByCurrentUser: false,
  setModifyData: (data: Partial<ModifyDataState>) =>
    set((state) => ({ ...state, ...data }))
}));

useCostList.subscribe((state) => {
  console.log(state);
});

useTreatmentCost.subscribe((state) => {
  console.log(state);
});

useTreatmentType.subscribe((state) => {
  console.log(state);
});

useMedicalWriteStore.subscribe((state) => {
  console.log(state);
});

useModifyData.subscribe((state) => {
  console.log(state);
});
