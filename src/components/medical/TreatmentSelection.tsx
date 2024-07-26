import { motion } from "framer-motion";
import styles from "./TreatmentSelection.module.scss";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { useModalStore } from "@/stores/modal";
import TreatmentAddModal from "../modal/TreatmentAddModal";
import {
  useMedicalWriteStore,
  useModifyData,
  useTreatmentType
} from "@/stores/medicalWrite";
import { useEffect } from "react";
import { modifyInitialData } from "@/util/findTooth";

type TreatmentSelectionProps = {
  isModify: boolean;
};

const TreatmentSelection = ({ isModify }: TreatmentSelectionProps) => {
  const { openModal } = useModalStore();
  const {
    updateIsShared,
    updateDentistId,
    updateTreatmentList,
    updateVisitDate
  } = useMedicalWriteStore();
  const { treatmentType, updateOrAddTreatmentType, clearTreatmentType } =
    useTreatmentType();
  const { treatmentList } = useModifyData();

  const handleTreatmentClick = (id: number, name: string) => {
    if (id !== 1 && id !== 2) {
      openModal(<TreatmentAddModal treatmentName={name} treatmentId={id} />);
    } else {
      if (
        treatmentType.find((treatment) => treatment.name === name)?.number === 1
      ) {
        updateOrAddTreatmentType(id, name, 0, false);
      } else {
        updateOrAddTreatmentType(id, name, 1, true);
      }
    }
  };

  useEffect(() => {
    if (isModify) {
      clearTreatmentType();
      const modifyData = modifyInitialData(treatmentList);
      modifyData.forEach((data) => {
        updateOrAddTreatmentType(data.id, data.name, data.number, data.isClick);
      });
    } else {
      updateIsShared(true);
      updateDentistId(0);
      updateTreatmentList([]);
      updateVisitDate("");
    }
  }, [isModify, treatmentList]);

  const checkTreatment = (name: string) => {
    const treatment = treatmentType.find(
      (treatment) => treatment.name === name
    );

    return treatment && treatment.isClick;
  };

  const checkTreatmentNumber = (name: string) => {
    const treatment = treatmentType.find(
      (treatment) => treatment.name === name
    );

    return treatment ? treatment.number : 0;
  };

  const isDisplayNumber = (name: string, number: number) => {
    if (name === "스케일링" || name === "잇몸") {
      return false;
    }

    return number > 0;
  };

  return (
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
            {isDisplayNumber(
              treatment.name,
              checkTreatmentNumber(treatment.name)
            )
              ? ` ${checkTreatmentNumber(treatment.name)}개 `
              : ""}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TreatmentSelection;
