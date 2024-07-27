"use client";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import PostCard from "@/components/common/PostCard";
import Link from "next/link";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getKeywordCommunityList,
  getLoginedKeywordCommunityList
} from "@/api/communityApi";
import Loading from "../loading";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/api/authService";
import { useRouter } from "next/navigation";
import { NoticeData, fetchNoticeData } from "@/api/myPage";

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
  const router = useRouter();
  const [selectedKeyword, setSelectedKeyword] = useState(1);
  // const {UserProfile}
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } =
    useInfiniteQuery({
      queryKey: ["getCommunity", selectedKeyword],
      queryFn: ({ pageParam = 0 }) => {
        return getLoginedKeywordCommunityList({ pageParam }, selectedKeyword);
        // getKeywordCommunityList({ pageParam }, selectedKeyword)
      },
      getNextPageParam: (lastPage) => lastPage.nextOffset ?? false,
      initialPageParam: 0,
      staleTime: 0
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

  const handleKeyowrd = (keyword: number) => {
    setSelectedKeyword(keyword);
  };

  const handleAlarm = () => {
    router.push("/community/notice");
  };

  const [hasNotice, setHasNotice] = useState(false);
  const { data: noticeData, refetch: noticeRefetch } = useQuery<NoticeData[]>({
    queryKey: ["notice"],
    queryFn: () => {
      return fetchNoticeData();
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 30
  });

  useEffect(() => {
    if (noticeData) {
      const unreadNotice = noticeData.filter((v) => !v.read);
      if (unreadNotice.length > 0) {
        setHasNotice(true);
      } else {
        setHasNotice(false);
      }
    }
  }, [noticeData]);

  return (
    <main className={styles.main}>
      {isLoading && <Loading useBg={false} />}
      <div className={styles.tab}>
        <Tab pageType="page" initialActiveTab="커뮤니티" />
        <button
          type="button"
          className={hasNotice ? styles.newNotice : styles.notice}
          onClick={handleAlarm}
        >
          알림
        </button>
      </div>
      {/* 추후 검색 기능 구현
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
        {/* 삭제버튼 기능 추후 구현 * /}
        <button type="button" className={styles.deleteButton}>
          삭제
        </button>
      </div>
    */}

      <div className={styles.treatmentWrapper}>
        <TreatmentSwiper listType="all" showSelected={handleKeyowrd} />
      </div>
      {/* 데이터 맵핑 예정 */}
      {data?.pages.map((page) =>
        page.posts.map((v: PostDataType) => (
          <Link key={v.postId} href={`/community/post/${v.postId}`}>
            <PostCard type="community" data={v} refetch={refetch} />
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
