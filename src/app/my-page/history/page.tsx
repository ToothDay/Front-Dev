"use client";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import HistoryCard from "@/components/common/HistoryCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { VisitData } from "../../../api/medical";
import { fetchVisitMyData } from "@/api/medicalRecord";
import Loading from "@/app/loading";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useCallback, useEffect, useRef } from "react";

const MyHistory = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["visitMyData"],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      fetchVisitMyData(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length;
    },
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
