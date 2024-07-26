"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import NoData from "@/components/common/NoData";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCommentPostData,
  fetchLikePostData,
  fetchMyPostData
} from "@/api/myPage";
import { useEffect, useState } from "react";
import { PostData } from "../../../api/myPage";
import MyPostCard from "@/components/common/MyPostCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

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

const MyActivity = ({ params }: PropsPage) => {
  const [myPost, setMyPost] = useState<PostData[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  const postMutation = useMutation({
    mutationFn: fetchMyPostData,
    onSuccess: (data) => {
      console.log("data____", data);
      setMyPost(data);
      setIsFetched(true);
    },
    onError: (error) => {
      setIsFetched(true);
    }
  });

  const likePostMutation = useMutation({
    mutationFn: fetchLikePostData,
    onSuccess: (data) => {
      console.log("data_____", data);
      setMyPost(data);
      setIsFetched(true);
    },
    onError: (error) => {
      setIsFetched(true);
    }
  });

  const commentPostMutation = useMutation({
    mutationFn: fetchCommentPostData,
    onSuccess: (data) => {
      console.log("data_____", data);
      setMyPost(data);
      setIsFetched(true);
    },
    onError: (error) => {
      setIsFetched(true);
    }
  });

  const getMyPost = () => {
    try {
      postMutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const getLikePost = () => {
    try {
      likePostMutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentPost = () => {
    try {
      commentPostMutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.type === "like") {
      getLikePost();
      console.log(myPost);
    }
    if (params.type === "post") {
      getMyPost();
    }
    if (params.type === "comment") {
      getCommentPost();
    }
  }, []);

  return (
    <>
      {postMutation.isPending ? (
        <LoadingSpinner />
      ) : (
        <main className={styles.main}>
          <div className={styles.header}>
            <Header title={HEADER_TITLE[params.type]} />
          </div>
          {!isFetched && <LoadingSpinner />}
          <div className={styles.postList}>
            {!postMutation.isPending && isFetched && myPost.length === 0 ? (
              <NoData type={params.type} />
            ) : (
              myPost.map((post) => (
                <MyPostCard
                  key={post.postId}
                  type={params.type}
                  listData={post}
                />
              ))
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default MyActivity;
