"use client";
import styles from "./MedicalContent.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import UserWelcome from "@/components/medical/UserWelcome";
import { VisitData } from "../../api/medical";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useRef, useState } from "react";
import NoSearchData from "../noData/NoSearchData";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type MedicalContentProps = {
  myData: VisitData[];
  otherData: VisitData[];
  hasMyData: boolean;
};

const MedicalContent = ({
  myData,
  otherData,
  hasMyData
}: MedicalContentProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleViewAll = () => {
    if (myData.length !== 0) {
      setIsLoading(true);
      router.push(`/my-page/history`);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <main className={styles.main} ref={mainRef}>
        <Tab pageType="page" initialActiveTab="진료기록" />
        <UserWelcome hasMyData={hasMyData} />
        {myData.length !== 0 && (
          <section className={styles.medicalRecentlySection}>
            <div className={styles.titleWrapper}>
              <span className={styles.wrapperTitle}>최근 진료 기록</span>
              <button
                className={styles.allButton}
                onClick={() => handleViewAll()}
              >
                전체보기
              </button>
            </div>
            <div className={styles.recentlyCard}>
              <HistoryCard cardType="myHistory" userData={myData} />
            </div>
          </section>
        )}
        <section className={styles.medicalOtherSection}>
          <div className={styles.titleWrapper}>
            <span className={styles.wrapperTitle}>
              다른 사용자들의 진료 기록
            </span>
          </div>
          <TreatmentSwiper listType="all" />
          <div className={styles.otherCard}>
            <div className={styles.cardList}>
              {otherData.length === 0 ? (
                <NoSearchData searchType="record" />
              ) : (
                <HistoryCard cardType="otherHistory" userData={otherData} />
              )}
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop mainRef={mainRef} />
    </>
  );
};

export default MedicalContent;
