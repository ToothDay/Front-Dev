"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MedicalWrite.module.scss";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import Tooth from "../tooth/Tooth";
import BtnBottom from "../common/BtnBottom";
import ClinicInput from "@/components/medical/ClinicInput";
import DateInput from "@/components/medical/DateInput";
import TreatmentSelection from "./TreatmentSelection";
import CostInput from "./CostInput";

type ToothSide = {
  value: "left" | "right";
  name: "왼쪽" | "오른쪽";
};

type ShareButton = {
  label: string;
  value: boolean;
};

const slideInVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const MedicalWrite = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<number[]>([]);
  const [toothSelect, setToothSelect] = useState<"left" | "right">("left");
  const [isShare, setIsShare] = useState<boolean>(true);
  const [isClinic, setIsClinic] = useState<boolean>(false);
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
  const shareButton: ShareButton[] = [
    { label: "네", value: true },
    { label: "아니요", value: false }
  ];

  const clickTreatment = selectedTreatments.length > 0;

  return (
    <form className={styles.writeForm}>
      <ClinicInput isClinic={isClinic} setIsClinic={setIsClinic} />
      <DateInput />
      <TreatmentSelection
        selectedTreatments={selectedTreatments}
        setSelectedTreatments={setSelectedTreatments}
      />
      <AnimatePresence>
        {clickTreatment && (
          <>
            <CostInput />
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
                      <Tooth location={toothSelect} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            <motion.div
              className={styles.writeWrapper}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <label className={styles.writeLabel}>
                다른 사용자들에게 <br /> 기록을 공유할까요?
              </label>
              <span className={styles.helperText}>
                -- 님의 기록이 다른 사용자들에게
                <br />
                좋은 정보가 될 수 있어요!
              </span>
              <div className={[styles.toothSelect, styles.share].join(" ")}>
                {shareButton.map((share) => {
                  return (
                    <button
                      type="button"
                      key={share.label}
                      className={[
                        styles.treatmentButton,
                        share.value === isShare ? styles.selected : ""
                      ].join(" ")}
                      onClick={() => setIsShare(share.value)}
                    >
                      {share.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
            <BtnBottom btnType={false} title="기록 완료" />
          </>
        )}
      </AnimatePresence>
    </form>
  );
};

export default MedicalWrite;
