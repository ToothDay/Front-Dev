"use client";

import styles from "@/components/modal/TreatmentAddModal.module.scss";
import { useState } from "react";

const TreatmentAddModal = () => {
  const [addNum, setAddNum] = useState<number>(0);

  const handleMinus = () => {
    if (addNum > 0) {
      setAddNum(addNum - 1);
    }
  };

  const handlePlus = () => {
    setAddNum(addNum + 1);
  };

  const handleRefresh = () => {
    setAddNum(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAddNum(0);
      return;
    }

    if (Number(value) < 0) {
      setAddNum(0);
      return;
    }
    if (isNaN(Number(value))) {
      setAddNum(0);
      return;
    }
    setAddNum(Number(value));
  };

  return (
    <div className={styles.add}>
      <p className={styles.title}>개수를 선택해 주세요.</p>
      <div className={styles.addBox}>
        <span className={styles.addTitle}>인레이</span>
        <div className={styles.addBtn}>
          <button type="button" className={styles.minus} onClick={handleMinus}>
            -
          </button>
          <input
            type="text"
            value={addNum}
            className={styles.addNum}
            onChange={handleChange}
          />
          <button type="button" className={styles.plus} onClick={handlePlus}>
            +
          </button>
        </div>
      </div>
      <div className={styles.addButton}>
        <button
          type="button"
          className={styles.refreshButton}
          onClick={handleRefresh}
        >
          <img src="/refresh.svg" alt="refresh" />
        </button>
        <button type="button" className={styles.saveButton}>
          완료
        </button>
      </div>
    </div>
  );
};

export default TreatmentAddModal;
