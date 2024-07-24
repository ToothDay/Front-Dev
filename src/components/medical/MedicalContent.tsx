"use client";
import styles from "./MedicalContent.module.scss";
import Tab from "@/components/common/Tab";
import HistoryCard from "@/components/common/HistoryCard";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import UserWelcome from "@/components/medical/UserWelcome";
import { VisitData } from "../../api/medical";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useEffect, useRef, useState, useCallback } from "react";
import NoSearchData from "../noData/NoSearchData";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { fetchOtherVisitData } from "@/api/medicalRecord";
import { useInfiniteQuery } from "@tanstack/react-query";

type MedicalContentProps = {
  myData: VisitData[];
  hasMyData: boolean;
};

const MedicalContent = ({ myData, hasMyData }: MedicalContentProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
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
      setIsLoadingTime(false);
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

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

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
          <TreatmentSwiper
            listType="all"
            showSelected={handleKeyword}
            selectedKeyWord={selectedKeyword}
          />
          <div className={styles.otherCard}>
            <div className={styles.cardList}>
              {data?.pages.flatMap((page, index) => (
                <HistoryCard
                  key={index}
                  cardType="otherHistory"
                  userData={page}
                />
              ))}
              {isFetchingNextPage && <Loading useBg={true} />}
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
