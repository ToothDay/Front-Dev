"use client";
import { useEffect, useState } from "react";
import styles from "@/components/modal/ToothWriteModal.module.scss";
import BtnBottom from "../common/BtnBottom";
import { useCostList, useTreatmentCost } from "@/stores/medicalWrite";
import { useModalStore } from "@/stores/modal";
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
  const { selectedCost, updateSelectedCost } = useCostList();
  const { closeModal } = useModalStore();

  const [selectedTreatment, setSelectedTreatment] = useState<
    SelectedTreatment[]
  >([]);
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(false);

  // 스케일링 잇몸 제외한 치료항목 필터링
  const filterTreatment = treatmentCostList.filter(
    (treatment) =>
      treatment.name !== "스케일링" &&
      treatment.name !== "잇몸" &&
      !selectedCost.some((cost) => cost.id === treatment.id)
  );

  // 선택한 치료항목 추가, 중복 선택 방지
  const handleSelectedTreatment = (
    treatment: string,
    cost: string,
    id: number
  ) => {
    const clickTreatment = {
      id,
      category: treatment,
      amount: cost,
      toothId,
      isCheck: false
    };

    setSelectedTreatment((prevSelected) => {
      const isCheck = prevSelected.find((item) => item.id === id);

      if (isCheck) {
        return prevSelected.map((item) =>
          item.id === id ? { ...item, isCheck: !item.isCheck } : item
        );
      } else {
        const sameTreatment = prevSelected.find(
          (item) => item.category === treatment
        );
        if (sameTreatment) {
          return prevSelected;
        }
        return [...prevSelected, { ...clickTreatment, isCheck: true }];
      }
    });
  };

  // 선택된 치료항목의 치료비용을 전역 상태에 저장
  const updateToothCost = () => {
    const selectList = selectedTreatment.filter((item) => item.isCheck);
    const totalCategoryCost = selectList.map((item) => ({
      id: item.id,
      category: item.category,
      amount: Number(item.amount) ?? 0,
      toothId: item.toothId
    }));
    updateSelectedCost([...selectedCost, ...totalCategoryCost]);
  };

  // 선택된 치료항목에 따른 버튼 활성화
  useEffect(() => {
    const hasActiveTreatment = selectedTreatment.some(
      (treatment) => treatment.isCheck
    );
    setIsActiveBtn(hasActiveTreatment);
  }, [selectedTreatment]);

  // 선택항목 체크 여부
  const getSelectedItem = (id: number) => {
    return selectedTreatment.find((item) => item.id === id)?.isCheck;
  };

  // 모달 닫기 및 치료비용 저장
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
          {filterTreatment.map((treatment) => (
            <div
              key={treatment.id}
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
