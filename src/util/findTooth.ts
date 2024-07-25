import {
  LEFT_BOTTOM,
  LEFT_TOP,
  RIGHT_BOTTOM,
  RIGHT_TOP,
  ToothType
} from "@/constants/toothConstants";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { TreatmentList, TreatmentType } from "@/stores/medicalWrite";

export const findTooth = (toothId: number): ToothType | undefined => {
  const toothList = [
    ...LEFT_TOP,
    ...RIGHT_TOP,
    ...LEFT_BOTTOM,
    ...RIGHT_BOTTOM
  ];
  return toothList.find((tooth) => tooth.toothId === toothId);
};

// 수정시 treatmentType {id, name, number, isClick}로 변경 후 state에 저장

export const modifyInitialData = (
  treatmentList: TreatmentList[]
): TreatmentType[] => {
  const modifyMap: { [key: string]: TreatmentType } = {};

  treatmentList.forEach((treatment) => {
    const treatmentInfo = TREATMENT_LIST.find(
      (t) => t.name === treatment.category
    );
    if (treatmentInfo) {
      if (!modifyMap[treatment.category]) {
        modifyMap[treatment.category] = {
          id: treatmentInfo.id,
          name: treatment.category,
          number: 0,
          isClick: true
        };
      }
      modifyMap[treatment.category].number += 1;
    }
  });

  return Object.values(modifyMap);
};
