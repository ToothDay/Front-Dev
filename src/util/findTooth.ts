import {
  LEFT_BOTTOM,
  LEFT_TOP,
  RIGHT_BOTTOM,
  RIGHT_TOP,
  ToothType
} from "@/constants/toothConstants";

export const findTooth = (toothId: number): ToothType | undefined => {
  const toothList = [
    ...LEFT_TOP,
    ...RIGHT_TOP,
    ...LEFT_BOTTOM,
    ...RIGHT_BOTTOM
  ];
  return toothList.find((tooth) => tooth.toothId === toothId);
};
