import { motion } from "framer-motion";
import styles from "./TreatmentSelection.module.scss";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { useModalStore } from "@/stores/modal";
import TreatmentAddModal from "../modal/TreatmentAddModal";
import { useTreatmentNumber } from "@/stores/medicalWrite";

const TreatmentSelection = () => {
  const { openModal } = useModalStore();

  const [treatmentName, setTreatmentName] = useState<string>("");
  const [treatmentId, setTreatmentId] = useState<number>(0);
  const { treatmentNumber, updateOrAddTreatmentNumber } = useTreatmentNumber();

  const handleTreatmentClick = (id: number, name: string) => {
    setTreatmentName(name);
    setTreatmentId(id);

    if (id !== 2 && id !== 7) {
      openModal();
    } else {
      if (
        treatmentNumber.find((treatment) => treatment.name === name)?.number ===
        1
      ) {
        updateOrAddTreatmentNumber(id, name, 0, false);
      } else {
        updateOrAddTreatmentNumber(id, name, 1, true);
      }
    }
  };

  const checkTreatment = (name: string) => {
    const treatment = treatmentNumber.find(
      (treatment) => treatment.name === name
    );

    return treatment && treatment.isClick;
  };

  return (
    <>
      <motion.div
        className={styles.writeWrapper}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -100 }
        }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        <label className={styles.writeLabel}>어떤 치료를 받으셨나요?</label>
        <span className={styles.helperText}>중복 선택이 가능해요.</span>
        <div className={styles.treatmentList}>
          {TREATMENT_LIST.map((treatment) => (
            <button
              type="button"
              key={treatment.id}
              className={[
                styles.treatmentButton,
                checkTreatment(treatment.name) ? styles.selected : ""
              ].join(" ")}
              onClick={() => {
                handleTreatmentClick(treatment.id, treatment.name);
              }}
            >
              {treatment.name}
            </button>
          ))}
        </div>
      </motion.div>
      <Modal>
        <TreatmentAddModal
          treatmentName={treatmentName}
          treatmentId={treatmentId}
        />
      </Modal>
    </>
  );
};

export default TreatmentSelection;
