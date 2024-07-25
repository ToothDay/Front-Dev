"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import MedicalWrite from "@/components/medical/MedicalWrite";
import { useEffect, useState } from "react";
import { useToothStore } from "@/stores/tooth";
import { useCostList, useTreatmentCost } from "@/stores/medicalWrite";

const MedicalWritePage = () => {
  const { saveTooth, setSaveTooth } = useToothStore();
  const { updateTreatmentCost } = useTreatmentCost();
  const { selectedCost, updateSelectedCost } = useCostList();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setSaveTooth([]);
    updateTreatmentCost([]);
    updateSelectedCost([]);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (selectedCost.length > 0) {
        const updateSelectedTooth = selectedCost.map((cost) => cost.toothId);
        setSaveTooth(updateSelectedTooth);
      }
    }
  }, [selectedCost, isInitialized]);

  return (
    <main className={styles.main}>
      <Header />
      <MedicalWrite />
    </main>
  );
};

export default MedicalWritePage;
