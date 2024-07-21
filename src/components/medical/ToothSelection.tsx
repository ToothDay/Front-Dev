import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ToothWriteModal from "../modal/ToothWriteModal";
import styles from "./ToothSelection.module.scss";
import {
  useCostList,
  useMedicalWriteStore,
  useTreatmentCost,
  useTreatmentType
} from "../../stores/medicalWrite";
import { useModalStore } from "@/stores/modal";
import { ToothType } from "@/constants/toothConstants";
import ToothSelectSection from "../tooth/ToothSelectSection";

const ToothSelection = () => {
  const { treatmentType } = useTreatmentType();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const [selectedTooth, setSelectedTooth] = useState<ToothType>({
    toothId: 0,
    name: "",
    number: 0,
    icon: ""
  });
  const { selectedCost } = useCostList();
  const { updateTreatmentList } = useMedicalWriteStore();
  const { treatmentCostList } = useTreatmentCost();
  const { openModal } = useModalStore();

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
    const shouldDisplay = !treatmentType.every(
      (treatment) => treatment.name === "스케일링" || treatment.name === "잇몸"
    );
    setIsDisplay(shouldDisplay);
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
