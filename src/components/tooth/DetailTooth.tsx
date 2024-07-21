"use client";
import styles from "./DetailTooth.module.scss";
import ToothSelectSelection from "@/components/tooth/ToothSelectSection";
import { TreatmentItem } from "../../api/medical";

type DetailToothProps = {
  treatmentList: TreatmentItem[];
};

const DetailTooth = ({ treatmentList }: DetailToothProps) => {
  const treatmentToothList = treatmentList
    .map((item) => item.toothId)
    .filter((toothId): toothId is number => toothId !== null);

  return (
    <section className={styles.toothSection}>
      <span className={styles.title}>치아 상태</span>
      <ToothSelectSelection treatmentToothList={treatmentToothList} />
    </section>
  );
};

export default DetailTooth;
