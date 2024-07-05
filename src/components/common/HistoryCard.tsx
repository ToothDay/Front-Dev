import styles from "@/components/common/HistoryCard.module.scss";

type PropsCard = {
  cardType: "myHistory" | "otherHistory";
};

const HistoryCard = ({ cardType }: PropsCard) => {
  return (
    <div className={styles.card}>
      <div className={styles.dentistInfo}>
        <div className={styles.cardTop}>
          <button className={styles.moreButton}>전체보기</button>
          {cardType === "myHistory" && <span>2024.03.24</span>}
          <p className={styles.dentistName}>치과이름</p>
          <p>서울시 동작구 상도동</p>
        </div>
        <div className={styles.cardBottom}>
          <p>치료종류: 잇몸, 인레이</p>
          <p>총 가격: 40만원 </p>
          {cardType === "otherHistory" && (
            <img src="/default.svg" alt="tooth" className={styles.toothIcon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
