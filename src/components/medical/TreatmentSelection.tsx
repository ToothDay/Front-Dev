import { motion } from "framer-motion";
import styles from "./TreatmentSelection.module.scss";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import Modal from "@/components/modal/Modal";
import TreatmentModal from "../modal/TreatmentModal";
import { useState } from "react";
import { useModalStore } from "@/stores/modal";
import TreatmentAddModal from "../modal/TreatmentAddModal";

type PropsTreatmentSelection = {
  selectedTreatments: number[];
  setSelectedTreatments: (
    value: number[] | ((prev: number[]) => number[])
  ) => void;
};

const TreatmentSelection = ({
  selectedTreatments,
  setSelectedTreatments
}: PropsTreatmentSelection) => {
  const { openModal } = useModalStore();

  const handleTreatmentClick = (id: number) => {
    setSelectedTreatments((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
    if (id !== 2 && id !== 7) {
      openModal();
    }
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
                selectedTreatments.includes(treatment.id) ? styles.selected : ""
              ].join(" ")}
              onClick={() => {
                handleTreatmentClick(treatment.id);
              }}
            >
              {treatment.name}
            </button>
          ))}
        </div>
      </motion.div>
      <Modal>
        <TreatmentAddModal />
      </Modal>
    </>
  );
};

export default TreatmentSelection;
