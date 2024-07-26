import { TreatmentList } from "@/stores/medicalWrite";

export const validateDentistId = (dentistId: number) => {
  if (dentistId <= 0) {
    return false;
  }
  return true;
};

export const validateDate = (date: string) => {
  if (date.length === 0) {
    return false;
  }
  return true;
};

export const validateSelectTooth = (tooth: number[], count: number) => {
  if (tooth.length !== count) {
    return false;
  }
  return true;
};

export const validateToothCost = (treatmentList: TreatmentList[]) => {
  if (treatmentList.length > 0) {
    const noCost = treatmentList.some((treatment) => treatment.amount === 0);
    if (noCost) {
      return false;
    } else {
      return true;
    }
  }
};
