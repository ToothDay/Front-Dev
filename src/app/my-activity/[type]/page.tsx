"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import NoData from "@/components/common/NoData";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCommentPostData,
  fetchLikePostData,
  fetchMyPostData
} from "@/api/myPage";
import MyPostCard from "@/components/common/MyPostCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useInfiniteScroll from "@/hook/useInfiniteScroll";
import { useRef } from "react";

type ActivityType = "post" | "like" | "comment";

type PropsPage = {
  params: {
    type: ActivityType;
  };
};

type HeaderTitleType = {
  [key in ActivityType]: string;
};

const HEADER_TITLE: HeaderTitleType = {
  post: "내가 작성한 글",
  like: "내가 좋아요 누른 글",
  comment: "내가 댓글 단 글"
};

const fetchActivityData = async (page: number, type: ActivityType) => {
  switch (type) {
    case "post":
      return fetchMyPostData(page);
    case "like":
      return fetchLikePostData(page);
    case "comment":
      return fetchCommentPostData(page);
    default:
      throw new Error("유효하지 않은 type 입니다.");
  }
};

const MyActivity = ({ params }: PropsPage) => {
  const { type } = params;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["activityData", type],
      queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
        fetchActivityData(pageParam, type),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) return undefined;
        return pages.length;
      },
      staleTime: 0,
      initialPageParam: 0
    });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage
  });

  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <main className={styles.main} ref={mainRef}>
        <div className={styles.header}>
          <Header title={HEADER_TITLE[type]} />
        </div>
        <div className={styles.postList}>
          {data?.pages.flatMap((page, index) =>
            page.map((post, index) => (
              <MyPostCard key={index} type={type} listData={post} />
            ))
          )}
          <div ref={loadMoreRef} />
          {!isLoading && data?.pages.flatMap((page) => page).length === 0 && (
            <NoData type={type} />
          )}
        </div>
      </main>
    </>
  );
};

export default MyActivity;
