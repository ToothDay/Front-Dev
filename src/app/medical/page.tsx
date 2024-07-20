import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import UserWelcome from "@/components/medical/UserWelcome";
import { fetchVisitData } from "@/api/medical";
import { VisitData } from "../../api/medical";

const getMedicalHistory = async (): Promise<VisitData[]> => {
  try {
    const response = await fetchVisitData();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MedicalPage = async () => {
  const data: VisitData[] = await getMedicalHistory();
  const myData = data.filter((item) => item.writtenByCurrentUser);
  const otherData = data.filter((item) => !item.writtenByCurrentUser);
  const hasMyData = myData.length === 0;

  return (
    <main className={styles.main}>
      <Tab pageType="page" initialActiveTab="진료기록" />
      <UserWelcome hasMyData={hasMyData} />
      <section className={styles.medicalRecentlySection}>
        <div className={styles.titleWrapper}>
          <span className={styles.wrapperTitle}>최근 진료 기록</span>
          <button className={styles.allButton}>전체보기</button>
        </div>
        <div className={styles.recentlyCard}>
          <HistoryCard cardType="myHistory" userData={myData} />
        </div>
      </section>
      <section className={styles.medicalOtherSection}>
        <div className={styles.titleWrapper}>
          <span className={styles.wrapperTitle}>다른 사용자들의 진료 기록</span>
        </div>
        <TreatmentSwiper listType="all" />
        <div className={styles.otherCard}>
          <div className={styles.cardList}>
            <HistoryCard cardType="otherHistory" userData={otherData} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MedicalPage;
