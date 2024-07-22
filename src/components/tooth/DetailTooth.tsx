"use client";
import styles from "./DetailTooth.module.scss";
import ToothSelectSection from "@/components/tooth/ToothSelectSection";
import { TreatmentItem } from "../../api/medical";
import { useModalStore } from "@/stores/modal";
import { useEffect, useState } from "react";
import TreatmentModal from "../modal/TreatmentModal";
import { ToothType } from "@/constants/toothConstants";
import { useToothStore } from "@/stores/tooth";

type DetailToothProps = {
  treatmentList?: TreatmentItem[];
};

const DetailTooth = ({ treatmentList = [] }: DetailToothProps) => {
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const [selectedTooth, setSelectedTooth] = useState<ToothType>({
    toothId: 0,
    name: "",
    number: 0,
    icon: ""
  });
  const { openModal } = useModalStore();
  const { setSaveTooth } = useToothStore();

  useEffect(() => {
    const clickItem = treatmentList.filter((item) => {
      return item.toothId === selectedTooth.toothId;
    });

    if (isDisplayModal) {
      openModal(
        <TreatmentModal
          treatmentList={clickItem}
          toothInfo={selectedTooth}
          type="detail"
        />
      );
      setIsDisplayModal(false);
    }
  }, [isDisplayModal, openModal]);

  useEffect(() => {
    const treatmentToothList = treatmentList
      .map((item) => item.toothId)
      .filter((toothId): toothId is number => toothId !== null);
    setSaveTooth(treatmentToothList);
  }, [treatmentList]);

  return (
    <section className={styles.toothSection}>
      <span className={styles.title}>치아 상태</span>
      <ToothSelectSection
        setIsDisplayModal={setIsDisplayModal}
        setSelectedTooth={setSelectedTooth}
      />
    </section>
  );
};

export default DetailTooth;
