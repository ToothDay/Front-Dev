import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tooth from "../tooth/Tooth";
import styles from "./ToothSelection.module.scss";
import {
  useCostList,
  useMedicalWriteStore,
  useTreatmentCost,
  useTreatmentType
} from "../../stores/medicalWrite";
import { useModalStore } from "@/stores/modal";
import ToothWriteModal from "../modal/ToothWriteModal";
import { ToothType } from "@/constants/toothConstants";

type ToothSide = {
  value: "left" | "right";
  name: "왼쪽" | "오른쪽";
};

const ToothSelection = () => {
  const { treatmentType } = useTreatmentType();
  const [toothSelect, setToothSelect] = useState<"left" | "right">("left");
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

  const { openModal } = useModalStore();
  const toothSide: ToothSide[] = [
    {
      value: "left",
      name: "왼쪽"
    },
    {
      value: "right",
      name: "오른쪽"
    }
  ];
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
        <>
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
            <div className={styles.toothItem}>
              <div className={styles.toothSelect}>
                {toothSide.map((side) => (
                  <button
                    type="button"
                    key={side.value}
                    className={[
                      styles.treatmentButton,
                      side.value === toothSelect ? styles.selected : ""
                    ].join(" ")}
                    onClick={() => setToothSelect(side.value)}
                  >
                    {side.name}
                  </button>
                ))}
              </div>
              <div className={styles.toothImg}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={toothSelect}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Tooth
                      location={toothSelect}
                      setIsDisplayModal={setIsDisplayModal}
                      setSelectedTooth={setSelectedTooth}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* <span className={styles.errorText}>
              치아를 눌러 치료를 기록해 주세요.
            </span> */}
          </motion.div>
        </>
      )}
    </>
  );
};

export default ToothSelection;
