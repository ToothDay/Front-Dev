"use client";
import styles from "@/components/modal/ToothWriteModal.module.scss";
import BtnBottom from "../common/BtnBottom";
import { useTreatmentCost } from "@/stores/medicalWrite";
import { useEffect, useState } from "react";
import { CostList } from "@/stores/medicalWrite";

type ToothWriteModalProps = {
  toothId: number;
  teethName: string;
  icon: string;
};

type SelectedTreatment = {
  id: number;
  category: string;
  amount: string;
  toothId: number;
  isCheck: boolean;
};

const ToothWriteModal = ({
  teethName,
  icon,
  toothId
}: ToothWriteModalProps) => {
  const { treatmentCostList } = useTreatmentCost();
  const [filterTreatment, setFilterTreatment] = useState<CostList[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<
    SelectedTreatment[]
  >([]);

  useEffect(() => {
    const filterTreatment = treatmentCostList.filter(
      (treatment) => treatment.name !== "스케일링" && treatment.name !== "잇몸"
    );
    setFilterTreatment(filterTreatment);
  }, [treatmentCostList]);

  const handleSelectedTreatment = (
    treatment: string,
    cost: string,
    id: number
  ) => {
    const clickTreatment = {
      id: id,
      category: treatment,
      amount: cost,
      toothId: toothId,
      isCheck: false
    };

    const isCheck = selectedTreatment.find((item) => item.id === id);

    if (isCheck) {
      setSelectedTreatment((prevSelected) =>
        prevSelected.map((item) =>
          item.id === id ? { ...item, isCheck: !item.isCheck } : item
        )
      );
    } else {
      const sameTreatment = selectedTreatment.find(
        (item) => item.category === treatment
      );
      if (sameTreatment) {
        return;
      }
      setSelectedTreatment((prevSelected) => [
        ...prevSelected,
        { ...clickTreatment, isCheck: true }
      ]);
    }
  };

  const getSelectedItem = (id: number) => {
    return selectedTreatment.find((item) => item.id === id)?.isCheck;
  };

  return (
    <div className={styles.write}>
      <div className={styles.writeTitle}>
        <img src={icon} alt="tooth" className={styles.teethImage} />
        <p className={styles.teethName}>
          {teethName} {toothId}
        </p>
        <p className={styles.subText}>
          해당되는 치료를 선택해 주세요 <br /> 최대 3개까지 중복 가능합니다.
        </p>
      </div>
      <div className={styles.teethBox}>
        <div className={styles.teethInfo}>
          {filterTreatment.map((treatment, index) => (
            <div
              className={[
                styles.info,
                getSelectedItem(treatment.id) && styles.selected
              ].join(" ")}
              onClick={() =>
                handleSelectedTreatment(
                  treatment.name,
                  treatment.value,
                  treatment.id
                )
              }
            >
              <span className={styles.infoTitle}>{treatment.name}</span>
              <span className={styles.infoTotal}>
                {treatment.value
                  ? Number(treatment.value).toLocaleString()
                  : "0"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BtnBottom btnType={false} title="기록 완료" />
    </div>
  );
};

export default ToothWriteModal;
