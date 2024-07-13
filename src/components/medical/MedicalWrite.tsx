"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MedicalWrite.module.scss";
import BtnBottom from "../common/BtnBottom";
import ClinicInput from "@/components/medical/ClinicInput";
import DateInput from "@/components/medical/DateInput";
import TreatmentSelection from "./TreatmentSelection";
import CostInput from "./CostInput";
import ToothSelection from "./ToothSelection";
import ShareOption from "./ShareOption";

const MedicalWrite = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<number[]>([]);
  const [isShare, setIsShare] = useState<boolean>(true);
  const [isClinic, setIsClinic] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(false);

  // const clickTreatment = selectedTreatments.length > 0;

  const clickTreatment = false;

  return (
    <form className={styles.writeForm}>
      <ClinicInput isClinic={isClinic} setIsClinic={setIsClinic} />
      <DateInput isCalendar={isCalendar} setIsCalendar={setIsCalendar} />
      <TreatmentSelection
        selectedTreatments={selectedTreatments}
        setSelectedTreatments={setSelectedTreatments}
      />
      <AnimatePresence>
        {clickTreatment && (
          <>
            <CostInput />
            <ToothSelection />
            <ShareOption isShare={isShare} setIsShare={setIsShare} />
            <BtnBottom btnType={false} title="기록 완료" />
          </>
        )}
      </AnimatePresence>
    </form>
  );
};

export default MedicalWrite;
