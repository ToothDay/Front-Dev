import styles from "@/app/my-history/page.module.scss";
import Header from "@/components/common/Header";
import HistoryCard from "@/components/common/HistoryCard";

const MyHistory = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title="나의 진료 기록" />
      </div>
      <div className={styles.cardList}>
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </div>
    </main>
  );
};

export default MyHistory;
