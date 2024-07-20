import { VisitData } from "@/api/medical";
import styles from "@/components/common/HistoryCard.module.scss";

type PropsCard = {
  cardType: "myHistory" | "otherHistory";
  userData: VisitData[];
};

const HistoryCard = ({ cardType, userData }: PropsCard) => {
  return (
    <>
      {userData.map((data) => (
        <div key={data.visitID} className={styles.card}>
          <div className={styles.dentistInfo}>
            <div className={styles.cardTop}>
              <button className={styles.moreButton}>전체보기</button>
              {cardType === "myHistory" && <span>{data.visitDate}</span>}
              <p className={styles.dentistName}>{data.dentistName}</p>
              <p>{data.dentistAddress}</p>
            </div>
            <div className={styles.cardBottom}>
              <p>
                치료종류:{" "}
                {data.treatmentList
                  .map((treatment) => treatment.category)
                  .join(", ")}
              </p>
              <p>총 가격: {data.totalAmount.toLocaleString()}원</p>
              {cardType === "otherHistory" && (
                <img
                  src="/default.svg"
                  alt="tooth"
                  className={styles.toothIcon}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HistoryCard;
