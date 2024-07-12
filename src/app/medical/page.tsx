import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";

const MedicalPage = () => {
  return (
    <main className={styles.main}>
      <Tab pageType="page" initialActiveTab="진료기록" />
      <section className={styles.medicalSection}>
        <div className={styles.myMedical}>
          <div className={styles.medicalText}>
            <span className={styles.title}>안녕하세요 님!</span>
            <div className={styles.noDataText}>
              <span className={styles.text}>최근 진료기록이</span>
              <span className={styles.text}>아직 없습니다.</span>
            </div>
          </div>
          <button type="button" className={styles.recordButton}>
            진료 기록하러 가기
          </button>
        </div>
      </section>
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
