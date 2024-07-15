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
  isSelected: boolean;
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
  const selectActiveTreatment = [];

  // 선택된 치료항목에 따른 버튼 활성화
  useEffect(() => {
    const hasActiveTreatment = selectedTreatment.some(
      (treatment) => treatment.isCheck
    );
    setIsActiveBtn(hasActiveTreatment);
  }, [selectedTreatment]);

  // 스케일링 잇몸 제외한 치료항목 필터링 및 selectedCost 항목 제거
  const filterTreatment = treatmentCostList
    .filter(
      (treatment) =>
        treatment.name !== "스케일링" &&
        treatment.name !== "잇몸" &&
        !selectedCost.some((cost) => cost.id === treatment.id)
    )
    .map((treatment) => ({
      id: treatment.id,
      category: treatment.name,
      amount: treatment.value,
      toothId: 0,
      isCheck: false,
      isSelected: false
    }));

  const getList = selectedCost.filter((item) => item.toothId === toothId);
  const listitem = getList.map((item) => {
    return {
      id: item.id,
      category: item.category,
      amount: String(item.amount),
      toothId: item.toothId,
      isCheck: false,
      isSelected: true
    };
  });
  filterTreatment.push(...listitem);

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
      isCheck: false,
      isSelected: false
    };

    setSelectedTreatment((prevSelected) => {
      const isCheck = prevSelected.find((item) => item.id === id);

      if (isCheck) {
        return prevSelected.map((item) =>
          item.id === id ? { ...item, isCheck: !item.isCheck } : item
        );
      } else {
        const sameTreatment = prevSelected.find(
          (item) => item.category === treatment && item.toothId === toothId
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
    selectedTreatment.forEach((item) => {
      if (item.isCheck) {
        item.isSelected = true;
        item.isCheck = false;
      }
    });

    const selectList = selectedTreatment.filter((item) => item.isSelected);
    const totalCategoryCost = selectList.map((item) => ({
      id: item.id,
      category: item.category,
      amount: Number(item.amount) ?? 0,
      toothId: item.toothId
    }));
    updateSelectedCost([...selectedCost, ...totalCategoryCost]);
  };

  // 선택항목 체크 여부 및 저장 여부
  const getTreatmentStatus = (id: number) => {
    const treatment = filterTreatment.find((item) => item.id === id);
    return {
      isCheck: treatment?.isCheck || false,
      isSelected: treatment?.isSelected || false
    };
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
          {filterTreatment.map((treatment) => {
            const { isCheck, isSelected } = getTreatmentStatus(treatment.id);
            return (
              <div
                key={treatment.id}
                className={[
                  styles.info,
                  isSelected ? styles.selected : ""
                ].join(" ")}
                onClick={() =>
                  handleSelectedTreatment(
                    treatment.category,
                    treatment.amount,
                    treatment.id
                  )
                }
              >
                <span className={styles.infoTitle}>{treatment.category}</span>
                <span className={styles.infoTotal}>
                  {treatment.amount
                    ? Number(treatment.amount).toLocaleString()
                    : "0"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div onClick={saveCostList}>
        <BtnBottom btnType={isActiveBtn} title="기록 완료" />
      </div>
    </div>
  );
};

export default ToothWriteModal;
