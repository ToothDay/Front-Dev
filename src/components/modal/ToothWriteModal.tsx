"use client";
import styles from "@/components/modal/ToothWriteModal.module.scss";
import BtnBottom from "../common/BtnBottom";
import { useCostList, useTreatmentCost } from "@/stores/medicalWrite";
import { useEffect, useState } from "react";
import { CostList } from "@/stores/medicalWrite";
import { CostType } from "@/stores/medicalWrite";
import { useModalStore } from "@/stores/modal";

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

  const { selectedCost, updateSelectedCost } = useCostList();
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);
  const { closeModal } = useModalStore();

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

  const updateToothCost = () => {
    const selectList = selectedTreatment.filter((item) => item.isCheck);
    const totalCategoryCost = selectList.map((item) => {
      return {
        id: item.id,
        category: item.category,
        amount: Number(item.amount) ?? 0,
        toothId: item.toothId
      };
    });
    updateSelectedCost([...selectedCost, ...totalCategoryCost]);
  };

  const activeSelections = () => {
    const select = selectedTreatment.filter((item) => item.isCheck);
    if (select.length > 0) {
      setIsActiveBtn(true);
    } else {
      setIsActiveBtn(false);
    }
  };

  useEffect(() => {
    activeSelections();
  }, [selectedTreatment]);

  const getSelectedItem = (id: number) => {
    return selectedTreatment.find((item) => item.id === id)?.isCheck;
  };

  const saveCostList = () => {
    updateToothCost();
    closeModal();
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
      <div onClick={saveCostList}>
        <BtnBottom btnType={isActiveBtn} title="기록 완료" />
      </div>
    </div>
  );
};

export default ToothWriteModal;
