"use client";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import PostCard from "@/components/common/PostCard";
import Link from "next/link";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLoginedCommunityList } from "@/api/communityApi";
import Loading from "../loading";
import { useEffect, useRef } from "react";

type PostDataType = {
  postId: number;
  createDate: Date;
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
  likedByCurrentUser: boolean;
  writtenByCurrentUser: boolean;
  imageUrl: string[];
  commentDTOList: [];
  keyword: number[];
  user: {
    email: string;
    id: number;
    profileImageUrl: string;
    username: string;
  };
};

const Community = () => {
  const hasNotice = false; //임시데이터값
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["getCommunity"],
      queryFn: ({ pageParam = 0 }) => getLoginedCommunityList({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextOffset ?? false,
      initialPageParam: 0
    });
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0
      }
    );

    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);
  return (
    <main className={styles.main}>
      {isLoading && <Loading useBg={false} />}
      <div className={styles.tab}>
        <Tab pageType="page" initialActiveTab="커뮤니티" />
        <button
          type="button"
          className={hasNotice ? styles.newNotice : styles.notice}
        >
          알림
        </button>
      </div>
      <div className={styles.searchWrapper}>
        <img
          src="/search-icon.svg"
          alt="search"
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.search}
          placeholder="검색어를 입력해 주세요."
        />
        {/* 삭제버튼 기능 추후 구현 */}
        <button type="button" className={styles.deleteButton}>
          삭제
        </button>
      </div>
      <div className={styles.treatmentWrapper}>
        <TreatmentSwiper listType="all" />
      </div>
      {/* 데이터 맵핑 예정 */}
      {data?.pages.map((page) =>
        page.posts.map((v: PostDataType) => (
          <Link key={v.postId} href={`/community/post/${v.postId}`}>
            <PostCard type="community" data={v} />
          </Link>
        ))
      )}
      <div ref={loadMoreRef} className={styles.scrollDiv} />

      {/* 검색종류 따라  */}
      {/* <NoSearchData searchType="post" /> */}
      {/* <NoSearchData searchType="word" /> */}
      <Link href={"/community/write"}>
        <div className={styles.writeBtnDiv}>
          <button className={styles.writeBtn} />
        </div>
      </Link>
    </main>
  );
};

export default Community;
