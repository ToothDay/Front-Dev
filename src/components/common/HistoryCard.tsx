import styles from "@/components/common/HistoryCard.module.scss";

const HistoryCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.dentistInfo}>
        <div className={styles.cardTop}>
          <button className={styles.moreButton}>전체보기</button>
          <span>2024.03.02</span>
          <p className={styles.dentistName}>치과이름</p>
          <p>서울시 동작구 상도동</p>
        </div>
        <div className={styles.cardBottom}>
          <p>치료종류: 잇몸, 인레이</p>
          <p>총 가격: 40만원 </p>
          <img src="/default.svg" alt="tooth" className={styles.toothIcon} />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
