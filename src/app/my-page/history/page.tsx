"use client";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import HistoryCard from "@/components/common/HistoryCard";
import { useQuery } from "@tanstack/react-query";
import { VisitData } from "../../../api/medical";
import { fetchVisitMyData } from "@/api/medicalRecord";
import Loading from "@/app/loading";

const MyHistory = () => {
  const { data = [], isLoading } = useQuery<VisitData[]>({
    queryKey: ["visitMyData"],
    queryFn: fetchVisitMyData,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true
  });

  return (
    <>
      {isLoading && <Loading />}
      <main className={styles.main}>
        <div className={styles.header}>
          <Header title="나의 진료 기록" />
        </div>
        <div className={styles.cardList}>
          <HistoryCard cardType="myHistory" userData={data} />
        </div>
      </main>
    </>
  );
};

export default MyHistory;
