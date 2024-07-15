import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import Link from "next/link";
import UserWelcome from "@/components/medical/UserWelcome";

const MedicalPage = () => {
  return (
    <main className={styles.main}>
      <Tab pageType="page" initialActiveTab="진료기록" />
      <UserWelcome />
      <section className={styles.medicalRecentlySection}>
        <div className={styles.titleWrapper}>
          <span className={styles.wrapperTitle}>최근 진료 기록</span>
          <button className={styles.allButton}>전체보기</button>
        </div>
        <div className={styles.recentlyCard}>
          <HistoryCard cardType="myHistory" />
        </div>
      </section>
      <section className={styles.medicalOtherSection}>
        <div className={styles.titleWrapper}>
          <span className={styles.wrapperTitle}>다른 사용자들의 진료 기록</span>
        </div>
        <TreatmentSwiper listType="all" />
        <div className={styles.otherCard}>
          <div className={styles.cardList}>
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
            <HistoryCard cardType="otherHistory" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MedicalPage;
