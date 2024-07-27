"use client";

import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NoticeData, fetchNotice, fetchNoticeData } from "@/api/myPage";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Error from "@/components/error/Error";
import { set } from "lodash";
import { useRouter } from "next/navigation";

const Notice = () => {
  const [noticeData, setNoticeData] = useState<NoticeData[]>([]);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery<NoticeData[]>({
    queryKey: ["notice"],
    queryFn: () => {
      return fetchNoticeData();
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true
  });
  const [isReadLoading, setIsReadLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNoticeData(data || []);
  }, [data]);

  const loadingMutation = useMutation({
    mutationFn: (id: number) => fetchNotice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    }
  });

  const handleClick = async (id: number) => {
    setIsReadLoading(true);
    loadingMutation.mutate(id);
    router.push(
      `/community/post/${noticeData.find((notice) => notice.id === id)?.postId}`
    );
    setTimeout(() => {
      setIsReadLoading(false);
    }, 5000);
  };

  return (
    <>
      {(isLoading || isReadLoading) && <Loading />}
      <main className={styles.main}>
        <Header />
        {/* <button className={styles.allButton}>모두 읽음</button> */}
        <ul className={styles.noticeList}>
          {noticeData.map((notice) => (
            <li
              className={[
                styles.noticeItem,
                notice.read ? styles.read : " "
              ].join(" ")}
              key={notice.id}
              onClick={() => {
                handleClick(notice.id);
              }}
            >
              <p className={styles.noticeTitle}>
                {notice.username}님이{" "}
                {notice.type === "LIKE"
                  ? "좋아요를 눌렀습니다."
                  : "댓글을 입력했습니다."}
              </p>
              <span className={styles.noticeText}>
                게시글: {notice.postTitle}
              </span>
            </li>
          ))}
        </ul>
        {noticeData.length === 0 && (
          <div className={styles.noNotice}>
            <img src="/alarm.png" alt="no-notice" />
            <p className={styles.noticeTitle}>알림이 없습니다.</p>
          </div>
        )}
      </main>
      {isError && <Error errorType="error" />}
    </>
  );
};

export default Notice;
