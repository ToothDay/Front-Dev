import { AnimatePresence, motion } from "framer-motion";
import styles from "./CostInput.module.scss";
import {
  useCostList,
  useTreatmentCost,
  useTreatmentType
} from "@/stores/medicalWrite";
import { useEffect } from "react";
import { CostList } from "@/stores/medicalWrite";
import { CostType } from "@/stores/medicalWrite";
const CostInput = () => {
  const { treatmentType } = useTreatmentType();
  const { treatmentCostList, updateTreatmentCost } = useTreatmentCost();
  const { selectedCost, updateSelectedCost } = useCostList();

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

  useEffect(() => {
    checkTreatmentCost();
  }, [treatmentType]);

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

  const handleChangeCost = (index: number, value: string) => {
    const newCostList = [...treatmentCostList];
    if (isNaN(Number(value))) {
      newCostList[index].value = "";
      return;
    }
    newCostList[index].value = value;
    updateTreatmentCost(newCostList);

    const selectedCostList = updateSelectedCostList(newCostList, selectedCost);
    updateSelectedCost(selectedCostList);
  };

  const handleDeleteCost = (index: number) => {
    const newCostList = [...treatmentCostList];
    newCostList[index].value = "";
    updateTreatmentCost(newCostList);

    const selectedCostList = updateSelectedCostList(newCostList, selectedCost);
    updateSelectedCost(selectedCostList);
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
      </div>
    </motion.div>
  );
};

export default CostInput;
