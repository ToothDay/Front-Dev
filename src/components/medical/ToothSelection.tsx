import React, { Dispatch, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ToothWriteModal from "../modal/ToothWriteModal";
import styles from "./ToothSelection.module.scss";
import {
  CostList,
  CostType,
  useCostList,
  useMedicalWriteStore,
  useModifyData,
  useTreatmentCost,
  useTreatmentType
} from "../../stores/medicalWrite";
import { useModalStore } from "@/stores/modal";
import { ToothType } from "@/constants/toothConstants";
import ToothSelectSection from "../tooth/ToothSelectSection";
import { useToothStore } from "@/stores/tooth";
import { TreatmentItem } from "@/api/medical";

interface ToothSelectionProps {
  setIsDisplay: Dispatch<React.SetStateAction<boolean>>;
  isDisplay: boolean;
  isModify: boolean;
}

const ToothSelection = ({
  isDisplay,
  setIsDisplay,
  isModify
}: ToothSelectionProps) => {
  const { treatmentType } = useTreatmentType();

  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const [selectedTooth, setSelectedTooth] = useState<ToothType>({
    toothId: 0,
    name: "",
    number: 0,
    icon: ""
  });
  const { selectedCost, updateSelectedCost } = useCostList();
  const { updateTreatmentList } = useMedicalWriteStore();
  const { treatmentCostList } = useTreatmentCost();
  const { openModal } = useModalStore();
  const { treatmentList } = useModifyData();
  const { setSaveTooth } = useToothStore();

  useEffect(() => {
    const notHasToothId = treatmentCostList
      .filter((cost) => cost.name === "스케일링" || cost.name === "잇몸")
      .map((cost) => ({
        category: cost.name,
        amount: Number(cost.value)
      }));

    const treatmentCost = selectedCost.map((cost) => {
      return {
        category: cost.category,
        amount: cost.amount,
        toothId: cost.toothId
      };
    });

    updateTreatmentList([...notHasToothId, ...treatmentCost]);
  }, [selectedCost, treatmentCostList]);

  useEffect(() => {
    if (!isModify) {
      const shouldDisplay = !treatmentType.every(
        (treatment) =>
          treatment.name === "스케일링" || treatment.name === "잇몸"
      );
      setIsDisplay((prev) => shouldDisplay);
    }
  }, [treatmentType]);

  useEffect(() => {
    if (isDisplayModal) {
      openModal(
        <ToothWriteModal
          teethName={selectedTooth.name}
          icon={selectedTooth.icon}
          toothId={selectedTooth.toothId}
        />
      );
      setIsDisplayModal(false);
    }
  }, [isDisplayModal, openModal]);

  useEffect(() => {
    if (isModify) {
      const toothList = treatmentList
        .map((item) => item.toothId)
        .filter((id): id is number => id !== null && id !== undefined);
      setSaveTooth(toothList);

      const validTreatmentList: TreatmentItem[] = treatmentList
        .filter(
          (item): item is TreatmentItem =>
            item.toothId !== null && item.toothId !== undefined
        )
        .map((item) => ({
          toothId: item.toothId,
          category: item.category,
          amount: item.amount
        }));
      const costList = mapToothId(treatmentCostList, validTreatmentList);
      updateSelectedCost(costList);
    }
  }, [treatmentList, treatmentCostList]);

  const mapToothId = (
    costList: CostList[],
    treatmentList: TreatmentItem[]
  ): CostType[] => {
    const result: CostType[] = [];
    const remainingTreatments = [...treatmentList]; // 남은 항목을 추적할 배열

    costList.forEach((cost) => {
      const treatmentIndex = remainingTreatments.findIndex(
        (treatment) =>
          treatment.category === cost.name &&
          String(treatment.amount) === cost.value
      );

      if (treatmentIndex !== -1) {
        const treatment = remainingTreatments[treatmentIndex];
        if (treatment.toothId !== null) {
          result.push({
            id: cost.id,
            category: cost.name,
            amount: Number(cost.value),
            toothId: treatment.toothId
          });
          remainingTreatments.splice(treatmentIndex, 1); // 매핑된 항목은 제거
        }
      }
    });

    return result;
  };

  return (
    <>
      {isDisplay && (
        <motion.div
          className={styles.writeWrapper}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <label className={styles.writeLabel}>
            치아를 선택해서 받은 치료를 <br /> 설정해 주세요.
          </label>
          <span className={styles.helperText}>
            스케일링과 잇몸치료는 설정에서 제외됩니다.
          </span>
          <ToothSelectSection
            setSelectedTooth={setSelectedTooth}
            setIsDisplayModal={setIsDisplayModal}
          />
        </motion.div>
      )}
    </>
  );
};

export default ToothSelection;
