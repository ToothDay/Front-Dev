"use client";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import HistoryCard from "@/components/common/HistoryCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVisitMyData } from "@/api/medicalRecord";
import Loading from "@/app/loading";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useRef } from "react";
import useInfiniteScroll from "@/hook/useInfiniteScroll";

const MyHistory = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["visitMyData"],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      fetchVisitMyData(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length * 10;
    },
    staleTime: 0,
    initialPageParam: 0
  });
  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading
  });

  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {isLoading && <Loading />}
      <main className={styles.main} ref={mainRef}>
        <div className={styles.header}>
          <Header title="나의 진료 기록" />
        </div>
        <div className={styles.cardList}>
          {data?.pages.flatMap((page, index) => (
            <HistoryCard cardType="myHistory" userData={page} />
          ))}
          <div ref={loadMoreRef} />
        </div>
      </main>
      <ScrollToTop mainRef={mainRef} />
    </>
  );
};

export default MyHistory;
