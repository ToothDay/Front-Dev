import { CostList, TreatmentList } from "@/stores/medicalWrite";

export const transformData = (
  items: CostList[],
  data: TreatmentList[]
): CostList[] => {
  const categoryAmounts: { [key: string]: number[] } = {};

  data.forEach((d) => {
    if (!categoryAmounts[d.category]) {
      categoryAmounts[d.category] = [];
    }
    categoryAmounts[d.category].push(d.amount);
  });

  const categoryIndex: { [key: string]: number } = {};

  return items.map((item) => {
    const category = item.name;

    if (!categoryIndex[category]) {
      categoryIndex[category] = 0;
    }

    const index = categoryIndex[category];
    const amounts = categoryAmounts[category];

    if (amounts && index < amounts.length) {
      item.value = amounts[index].toString();
      categoryIndex[category]++;
    }

    return item;
  });
};
