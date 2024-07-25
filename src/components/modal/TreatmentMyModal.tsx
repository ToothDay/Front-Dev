"use client";
import { TreatmentItem } from "@/api/medical";
import styles from "@/components/modal/TreatmentMyModal.module.scss";
import { ToothType } from "@/constants/toothConstants";
import { useEffect, useState } from "react";

type TreatmentModalProps = {
  treatmentList: TreatmentItem[][];
  toothInfo: ToothType;
  type: "detail" | "all";
  selectedTreatmentDate: string[];
};

const TreatmentMyModal = ({
  treatmentList,
  toothInfo,
  type,
  selectedTreatmentDate
}: TreatmentModalProps) => {
  const [treatmentName, setTreatmentName] = useState<string[]>([]);
  const [treatTotal, setTreatTotal] = useState<number>(0);

  useEffect(() => {
    const toothListName = treatmentList?.map((item) => {
      return item.map((treat) => treat.category).join(", ");
    });
    setTreatmentName(toothListName);

    const toothListTotal = treatmentList?.map((item) => {
      return item.reduce((acc, cur) => {
        return acc + Number(cur.amount);
      }, 0);
    });
    setTreatTotal(toothListTotal.reduce((acc, cur) => acc + cur, 0));
  }, [treatmentList]);

  return (
    <div className={styles.treatment}>
      <img src={toothInfo.icon} alt="tooth" className={styles.teethImage} />
      {treatmentList?.length > 0 ? (
        <>
          <p className={styles.teethName}>{toothInfo.name}</p>
          <div className={styles.treatmentBox}>
            {treatmentList.map((item, index) => (
              <div className={styles.hasData} key={index}>
                <div className={styles.teethInfo}>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>
                      {treatmentName[index]}
                    </span>
                    {type === "detail" && (
                      <span className={styles.infoTotal}>
                        {treatTotal.toLocaleString()}원
                      </span>
                    )}
                    {type === "all" && (
                      <span className={styles.infoDate}>
                        {selectedTreatmentDate[index]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.noData}>
          <p>{toothInfo.name}는</p>
          <p>치료 받은 기록이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentMyModal;
