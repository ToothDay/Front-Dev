import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import HistoryCard from "@/components/common/HistoryCard";

const MyHistory = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title="나의 진료 기록" />
      </div>
      <div className={styles.cardList}>
        {/* <HistoryCard cardType="myHistory" />
        <HistoryCard cardType="myHistory" />
        <HistoryCard cardType="myHistory" />
        <HistoryCard cardType="myHistory" />
        <HistoryCard cardType="myHistory" />
        <HistoryCard cardType="myHistory" /> */}
      </div>
    </main>
  );
};

export default MyHistory;
