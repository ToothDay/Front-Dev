import styles from "@/components/modal/TreatmentModal.module.scss";

const TreatmentModal = () => {
  return (
    <div className={styles.treatment}>
      {/* 데이터에 맞게 수정될 예정  */}
      <img src="/default.svg" alt="tooth" className={styles.teethImage} />
      <div className={styles.hasData}>
        <p className={styles.teethName}>왼쪽 7번 어금니</p>
        <div className={styles.teethInfo}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트, 크라운, 인레이</span>
            <span className={styles.infoTotal}>300,000원</span>
            <span className={styles.infoDate}>2023.07.01 수요일</span>
          </div>
        </div>
        {/* 데이터 맵핑 후 삭제예정 */}
        <div className={styles.teethInfo}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>인레이222222</span>
            <span className={styles.infoTotal}>300,000원</span>
            <span className={styles.infoDate}>2023.07.01 수요일</span>
          </div>
        </div>
        <div className={styles.teethInfo}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>인레이222222</span>
            <span className={styles.infoTotal}>300,000원</span>
            <span className={styles.infoDate}>2023.07.01 수요일</span>
          </div>
        </div>
      </div>
      {/* 데이터 없을경우 케이스 */}
      {/* <div className={styles.noData}>
        <p>오른쪽 7번 어금니는</p>
        <p>치료 받은 기록이 없습니다.</p>
      </div> */}
    </div>
  );
};

export default TreatmentModal;
