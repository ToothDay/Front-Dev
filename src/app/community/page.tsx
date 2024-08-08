"use client";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import PostCard from "@/components/common/PostCard";
import Link from "next/link";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getKeywordCommunityList,
  getLoginedKeywordCommunityList,
  getLoginedSearchCommunityList
} from "@/api/communityApi";
import Loading from "../loading";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/api/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { NoticeData, fetchNoticeData } from "@/api/myPage";
import NoSearchData from "@/components/noData/NoSearchData";

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
  const [isPagingLoading, setIsPagingLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } =
    useInfiniteQuery({
      queryKey: ["getCommunity", selectedKeyword, searchKeyword],
      queryFn: ({ pageParam = 0 }) => {
        if (searchKeyword?.length > 0) {
          return getLoginedSearchCommunityList({ pageParam }, searchKeyword);
        } else {
          return getLoginedKeywordCommunityList({ pageParam }, selectedKeyword);
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextOffset ?? false,
      initialPageParam: 0,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true
    });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
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

  const handleKeyword = (keyword: number) => {
    setSelectedKeyword(keyword);
    if (searchRef.current) {
      searchRef.current.value = "";
      setSearchKeyword("");
    }
  };

  const handleAlarm = () => {
    setIsPagingLoading(true);
    router.push("/community/notice");
    setTimeout(() => {
      setIsPagingLoading(false);
    }, 5000);
  };

  const handleLoading = (id: number) => {
    setIsPagingLoading(true);
    router.push(`/community/post/${id}`);
    setTimeout(() => {
      setIsPagingLoading(false);
    }, 3000);
  };

  const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setSelectedKeyword(-1);
      setSearchKeyword(target.value);
    }
  };
  const handleDeleteSearch = () => {
    setSearchKeyword("");
    if (searchRef.current) {
      searchRef.current.value = "";
      setSelectedKeyword(1);
    }
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
    <>
      {isPagingLoading && <Loading />}
      <main className={styles.main}>
        {isLoading && <Loading />}
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
            onKeyDown={handleEnterEvent}
            ref={searchRef}
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDeleteSearch}
          >
            삭제
          </button>
        </div>

        <div className={styles.treatmentWrapper}>
          <TreatmentSwiper
            listType="all"
            showSelected={handleKeyword}
            selectedKeyWord={selectedKeyword}
          />
        </div>
        {/* 데이터 맵핑 예정 */}
        {data?.pages.map((page) =>
          page.posts.map((v: PostDataType) => (
            <div
              onClick={() => {
                handleLoading(v.postId);
              }}
              key={v.postId}
            >
              <PostCard type="community" data={v} refetch={refetch} />
            </div>
          ))
        )}
        <div ref={loadMoreRef} className={styles.scrollDiv} />
        {data?.pages.flatMap((page) => page.posts).length === 0 && (
          <NoSearchData searchType="post" />
        )}

        {/* 검색종류 따라  */}
        {/* <NoSearchData searchType="post" /> */}
        {/* <NoSearchData searchType="word" /> */}
        <Link href={"/community/write"}>
          <div className={styles.writeBtnDiv}>
            <button className={styles.writeBtn} />
          </div>
        </Link>
      </main>
    </>
  );
};

export default Community;
