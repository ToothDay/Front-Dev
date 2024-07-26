"use client";
import styles from "./MedicalContent.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import UserWelcome from "@/components/medical/UserWelcome";
import { VisitData } from "../../api/medical";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useEffect, useRef, useState } from "react";
import NoSearchData from "../noData/NoSearchData";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { fetchOtherVisitData } from "@/api/medicalRecord";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "@/hook/useInfiniteScroll";

type MedicalContentProps = {
  myData: VisitData[];
  hasMyData: boolean;
};

const MedicalContent = ({ myData, hasMyData }: MedicalContentProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLoadingTime, setIsLoadingTime] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const initialKeyword = Number(searchParams.get("type")) || 1;
  const [selectedKeyword, setSelectedKeyword] =
    useState<number>(initialKeyword);

  const handleViewAll = () => {
    if (myData.length !== 0) {
      setIsLoadingTime(true);
      router.push(`/my-page/history`);
      setTimeout(() => {
        setIsLoadingTime(false);
      }, 5000);
    }
  };

  const handleKeyword = (keyword: number) => {
    setSelectedKeyword(keyword);
    router.push(`?type=${keyword}`);
  };

  useEffect(() => {
    if (initialKeyword !== selectedKeyword) {
      setSelectedKeyword(initialKeyword);
    }
  }, [initialKeyword, selectedKeyword]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["medicalOtherHistory", selectedKeyword],
      queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
        fetchOtherVisitData(pageParam, selectedKeyword),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) return undefined;
        return pages.length * 10;
      },
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 0,
      initialPageParam: 0
    });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage
  });

  return (
    <>
      {isLoadingTime && <Loading />}
      <main className={styles.main} ref={mainRef}>
        <Tab pageType="page" initialActiveTab="진료기록" />
        <UserWelcome hasMyData={hasMyData} />
        {myData.length !== 0 && (
          <section className={styles.medicalRecentlySection}>
            <div className={styles.titleWrapper}>
              <span className={styles.wrapperTitle}>최근 진료 기록</span>
              <button className={styles.allButton} onClick={handleViewAll}>
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
          <TreatmentSwiper
            listType="all"
            showSelected={handleKeyword}
            selectedKeyWord={selectedKeyword}
          />
          <div className={styles.otherCard}>
            <div className={styles.cardList}>
              {isLoading ? (
                <img
                  src="/spinner.gif"
                  alt="loading"
                  className={styles.loading}
                />
              ) : (
                data?.pages.flatMap((page, index) => (
                  <HistoryCard
                    key={index}
                    cardType="otherHistory"
                    userData={page}
                  />
                ))
              )}
              <div ref={loadMoreRef} />
            </div>
            {data?.pages.flatMap((page) => page).length === 0 && !isLoading && (
              <NoSearchData searchType="record" />
            )}
          </div>
        </section>
      </main>
      <ScrollToTop mainRef={mainRef} />
    </>
  );
};

export default MedicalContent;
