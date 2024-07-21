"use client";
import { TreatmentItem } from "@/api/medical";
import styles from "@/components/modal/TreatmentModal.module.scss";
import { ToothType } from "@/constants/toothConstants";
import { useEffect, useState } from "react";

type TreatmentModalProps = {
  treatmentList: TreatmentItem[];
  toothInfo: ToothType;
  type: "detail" | "all";
};

const TreatmentModal = ({
  treatmentList,
  toothInfo,
  type
}: TreatmentModalProps) => {
  const [treatmentName, setTreatmentName] = useState<string>("");
  const [treatTotal, setTreatTotal] = useState<number>(0);

  useEffect(() => {
    const toothListName = treatmentList
      .map((item) => {
        return item.category;
      })
      .join(", ");
    const toothListTotal = treatmentList.reduce((acc, cur) => {
      return acc + Number(cur.amount);
    }, 0);
    setTreatmentName(toothListName);
    setTreatTotal(toothListTotal);
  }, [treatmentList]);

  return (
    <div className={styles.treatment}>
      <img src={toothInfo.icon} alt="tooth" className={styles.teethImage} />
      {treatmentList.length > 0 ? (
        <div className={styles.hasData}>
          <p className={styles.teethName}>{toothInfo.name}</p>
          <div className={styles.teethInfo}>
            <div className={styles.info}>
              <span className={styles.infoTitle}>{treatmentName}</span>
              {type === "detail" && (
                <span className={styles.infoTotal}>{treatTotal}원</span>
              )}
              {type === "all" && (
                <span className={styles.infoDate}>2024.08</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noData}>
          <p>{toothInfo.name}는</p>
          <p>치료 받은 기록이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentModal;
