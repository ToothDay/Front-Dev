import { AnimatePresence, motion } from "framer-motion";
import styles from "./CostInput.module.scss";
import {
  TreatmentList,
  useCostList,
  useModifyData,
  useTreatmentCost,
  useTreatmentType
} from "@/stores/medicalWrite";
import { useEffect } from "react";
import { CostList, CostType } from "@/stores/medicalWrite";
import { TreatmentItem } from "@/api/medical";

type CostInputProps = {
  isModify: boolean;
};

const CostInput = ({ isModify }: CostInputProps) => {
  const { treatmentType } = useTreatmentType();
  const { treatmentCostList, updateTreatmentCost } = useTreatmentCost();
  const { selectedCost, updateSelectedCost } = useCostList();
  const { treatmentList } = useModifyData();

  const checkTreatmentCost = () => {
    const newCostList: CostList[] = [];
    treatmentType.forEach((item, index) => {
      if (item.number > 0) {
        for (let i = 0; i < item.number; i++) {
          const isExist = treatmentCostList.find(
            (cost) => cost.name === item.name && cost.id === newCostList.length
          );
          newCostList.push({
            id: newCostList.length,
            name: item.name,
            value: isExist ? isExist.value : ""
          });
          updateTreatmentCost(newCostList);
        }
      }
    });
    updateTreatmentCost(newCostList);
  };

  const transformData = (
    costList: CostList[],
    treatmentItems: TreatmentList[]
  ): CostList[] => {
    const categoryCountMap: { [key: string]: number } = {};
    treatmentItems.forEach((item) => {
      if (!categoryCountMap[item.category]) {
        categoryCountMap[item.category] = 0;
      }
    });

    const updatedCostList = costList.map((cost) => {
      const category = cost.name;

      if (categoryCountMap[category] !== undefined) {
        const currentCount = categoryCountMap[category];

        const treatmentItem = treatmentItems.find(
          (item) => item.category === category && item.amount > currentCount
        );

        if (treatmentItem) {
          cost.value = String(treatmentItem.amount);
          categoryCountMap[category]++;
        }
      }

      return cost;
    });

    return updatedCostList;
  };

  useEffect(() => {
    checkTreatmentCost();
  }, [treatmentType]);

  useEffect(() => {
    if (!isModify) {
      const newSelectedCost = selectedCost.filter((selected) => {
        return treatmentCostList.some((cost) => cost.id === selected.id);
      });
      updateSelectedCost(newSelectedCost);
    } else {
      if (treatmentCostList.length > 0) {
        transformData(treatmentCostList, treatmentList);
      }
    }
  }, [treatmentCostList]);

  const updateSelectedCostList = (
    newCostList: CostList[],
    selectedCost: CostType[]
  ) => {
    return selectedCost.map((selected) => {
      const matchingCostItem = newCostList.find(
        (cost) => cost.id === selected.id
      );
      if (
        matchingCostItem &&
        matchingCostItem.value !== String(selected.amount)
      ) {
        return { ...selected, amount: Number(matchingCostItem.value) };
      }
      return selected;
    });
  };

  const updateCostList = (index: number, value: string) => {
    const newCostList = [...treatmentCostList];
    newCostList[index].value = value;
    updateTreatmentCost(newCostList);

    const selectedCostList = updateSelectedCostList(newCostList, selectedCost);
    updateSelectedCost(selectedCostList);
  };

  const handleChangeCost = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      updateCostList(index, "");
      return;
    }
    updateCostList(index, value);
  };

  const handleDeleteCost = (index: number) => {
    updateCostList(index, "");
  };

  return (
    <motion.div
      className={styles.writeWrapper}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <label className={styles.writeLabel}>
        각 치료에 지불한 비용을 <br /> 입력해 주세요.
      </label>
      <span className={styles.helperText}>
        각각의 치료에 해당하는 비용을 입력해 주세요.
      </span>
      <div className={styles.cost}>
        <AnimatePresence>
          {treatmentCostList.map((item, index) => (
            <motion.div
              className={styles.costInput}
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <label className={styles.costLabel}>{item.name}</label>
              <div className={styles.costInputBox}>
                <input
                  type="text"
                  className={[styles.costBox, item.value && styles.fill].join(
                    " "
                  )}
                  placeholder="숫자만 입력하세요."
                  value={item.value}
                  onChange={(e) => handleChangeCost(index, e.target.value)}
                />
                {item.value && (
                  <button
                    type="button"
                    className={styles.deleteCost}
                    onClick={() => handleDeleteCost(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
              <span className={styles.costUnit}> 원</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* <span className={styles.errorText}>
          각 치료의 비용을 입력해 주세요.
        </span> */}
      </div>
    </motion.div>
  );
};

export default CostInput;
