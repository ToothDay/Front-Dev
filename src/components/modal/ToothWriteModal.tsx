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
  isSaved: boolean;
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
  const [filterTreatment, setFilterTreatment] = useState<SelectedTreatment[]>(
    []
  );
  const [totalSaveNumber, setTotalSaveNumber] = useState<number>(0);

  // 선택된 치료항목에 따른 버튼 활성화
  useEffect(() => {
    const hasActiveTreatment = selectedTreatment.some(
      (treatment) => treatment.isCheck
    );
    setIsActiveBtn(hasActiveTreatment);
  }, [selectedTreatment]);

  // 스케일링 잇몸 제외한 치료항목 필터링 및 selectedCost 항목 제거
  useEffect(() => {
    const initialTreatments = treatmentCostList
      .filter(
        (treatment) =>
          treatment.name !== "스케일링" && treatment.name !== "잇몸"
      )
      .map((treatment) => ({
        id: treatment.id,
        category: treatment.name,
        amount: treatment.value,
        toothId:
          selectedCost.find((cost) => cost.id === treatment.id)?.toothId || 0,
        isCheck: false,
        isSaved: !!selectedCost.find((cost) => cost.id === treatment.id)
      }));

    const filteredTreatments = initialTreatments.filter(
      (treatment) => treatment.toothId === 0 || treatment.toothId === toothId
    );
    setFilterTreatment([...filteredTreatments]);
  }, [treatmentCostList, toothId, selectedCost]);

  // 선택한 치료항목 추가, 중복 선택 방지
  const handleSelectedTreatment = (
    treatment: string,
    cost: string,
    id: number,
    isCheck: boolean,
    isSaved: boolean
  ) => {
    const clickTreatment = {
      id,
      category: treatment,
      amount: cost,
      toothId,
      isCheck: !isCheck,
      isSaved
    };

    const selectingTreatment = filterTreatment.filter(
      (item) => item.isCheck
    ).length;

    if (selectingTreatment + totalSaveNumber > 2) {
      return;
    }

    setFilterTreatment((prev) => {
      const updateTreatment = prev.map((item) =>
        item.id === id ? clickTreatment : item
      );
      return updateTreatment;
    });

    setSelectedTreatment((prev) => {
      const isExist = prev.find((item) => item.id === id);
      if (isExist) {
        return prev.map((item) => (item.id === id ? clickTreatment : item));
      } else {
        return [...prev, clickTreatment];
      }
    });
  };

  // 선택된 치료항목의 치료비용을 전역 상태에 저장
  const updateToothCost = () => {
    const updatedSelectedTreatment = selectedTreatment.map((item) => {
      if (item.isCheck) {
        return { ...item, isSaved: true, isCheck: false };
      }
      return item;
    });

    setFilterTreatment((prev) =>
      prev.map(
        (item) =>
          updatedSelectedTreatment.find(
            (treatment) => treatment.id === item.id
          ) ?? item
      )
    );

    const selectList = updatedSelectedTreatment.filter((item) => item.isSaved);

    let updatedSelectedCost = [...selectedCost];

    selectList.forEach((item) => {
      const existingIndex = updatedSelectedCost.findIndex(
        (cost) => cost.id === item.id
      );
      if (existingIndex !== -1) {
        updatedSelectedCost.splice(existingIndex, 1);
      } else {
        updatedSelectedCost.push({
          id: item.id,
          category: item.category,
          amount: Number(item.amount) ?? 0,
          toothId: item.toothId
        });
      }
    });

    updateSelectedCost(updatedSelectedCost);

    const finalUpdatedTreatment = updatedSelectedTreatment.map((item) => ({
      ...item,
      isSaved: false
    }));

    setSelectedTreatment(finalUpdatedTreatment);
  };

  // 선택항목 체크 여부 및 저장 여부
  const getClassName = (treatment: SelectedTreatment) => {
    if (treatment.isSaved) {
      return treatment.isCheck ? "" : styles.selected;
    } else {
      return treatment.isCheck ? styles.selected : "";
    }
  };

  // 모달 닫기 및 치료비용 저장
  const saveCostList = () => {
    updateToothCost();
    closeModal();
  };

  useEffect(() => {
    const selectedNumber = filterTreatment.filter(
      (item) => item.isSaved
    ).length;
    setTotalSaveNumber(selectedNumber);
  }, [filterTreatment]);

  return (
    <div className={styles.write}>
      <div className={styles.writeTitle}>
        <img src={icon} alt="tooth" className={styles.teethImage} />
        <p className={styles.teethName}>{teethName}</p>
        {filterTreatment.length === 0 ? (
          <p className={[styles.subText, styles.noText].join(" ")}>
            모든 치료가 선택되어 <br /> 해당 치아에서 선택될 목록이 <br />
            없습니다.
          </p>
        ) : (
          <p className={styles.subText}>
            해당되는 치료를 선택해 주세요 <br /> 최대 3개까지 중복 가능합니다.
          </p>
        )}
      </div>
      <div className={styles.teethBox}>
        <div className={styles.teethInfo}>
          {filterTreatment.map((treatment) => {
            return (
              <div
                key={treatment.id}
                className={[styles.info, getClassName(treatment)].join(" ")}
                onClick={() =>
                  handleSelectedTreatment(
                    treatment.category,
                    treatment.amount,
                    treatment.id,
                    treatment.isCheck,
                    treatment.isSaved
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
      {filterTreatment.length === 0 ? (
        <div onClick={closeModal}>
          <button className={styles.confirm}>확인</button>
        </div>
      ) : (
        <div onClick={saveCostList}>
          <BtnBottom btnType={isActiveBtn} title="기록 완료" />
        </div>
      )}
    </div>
  );
};

export default ToothWriteModal;
