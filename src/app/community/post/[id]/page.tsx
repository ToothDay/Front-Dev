"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import ImageSwiper from "@/components/common/ImageSwiper";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  delComment,
  delPost,
  getCommunityPost,
  postComment,
  postLike
} from "@/api/communityApi";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { useEffect, useState } from "react";
import { formatYYYYMMDDTIME } from "./../../../../util/formatDate";
import Loading from "@/app/loading";
import Modal from "@/components/modal/Modal";
import DeleteModal from "@/components/modal/DeleteModal";
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";
import SimpleModal from "@/components/modal/SimpleModal";

type postMainProps = {
  params: {
    id: number;
  };
};
type commentDTOList = {
  id: number;
  content: string;
  createDate: Date;
  profileImageUrl: string;
  username: string;
  writtenByCurrentUser: boolean;
};
const PostMain = (props: postMainProps) => {
  const [imageList, setImageList] = useState<{ src: string }[]>([]);
  const [comment, setComment] = useState("");
  const { userProfile } = useUserStore();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getCommunityPost"],
    queryFn: () => getCommunityPost(props.params.id),
    staleTime: 0
  });
  const { openModal } = useModalStore();

  useEffect(() => {
    if (data) {
      const newImageList = data.imageUrl.map((url: string) => ({ src: url }));
      setImageList(newImageList);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (postId: number) => postLike(postId),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => console.log(e)
  });

  const mutationComment = useMutation({
    mutationFn: (postId: number) => postComment(postId, comment),
    onSuccess: () => {
      refetch();
      setComment("");
    },
    onError: (e) => console.log(e)
  });

  const mutationDelComment = useMutation({
    mutationFn: (commentId: number) => delComment(commentId),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => console.log(e)
  });

  const mutationDelPost = useMutation({
    mutationFn: (commentId: number) => delPost(commentId),
    onSuccess: () => {
      refetch();
      openModal(<SimpleModal type={"delPostY"} answer={"확인"} />);
    },
    onError: (e) => console.log(e)
  });

  const handleLikeBtn = async () => {
    mutation.mutate(data?.postId);
  };
  const handleEnterComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.repeat) {
      mutationComment.mutate(data?.postId);
    }
  };

  const handleCommentChange = (e: { target: { value: string } }) => {
    setComment(e.target.value);
  };

  const handleDelComment = (commentId: number) => {
    mutationDelComment.mutate(commentId);
  };

  const handleDelPost = (postId: number) => {
    mutationDelPost.mutate(postId);
  };
  return (
    <main className={styles.main}>
      {isLoading && <Loading useBg={false} />}
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.postHeader}>
        <img src="/profile.svg" alt="user-profile" className={styles.profile} />
        <div className={styles.postInfo}>
          <p className={styles.postTitle}>{data?.title}</p>
          <div className={styles.postSubInfo}>
            <span className={styles.nickName}>{data?.user?.username}</span>
            <span className={styles.time}>
              {formatYYYYMMDDTIME(data?.createDate)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.postContentWrapper}>
        <p className={styles.postContent}>{data?.content}</p>
      </div>
      <ImageSwiper listType="all" imageList={imageList} type="read" />
      <div className={styles.tagDiv}>
        {data?.keywords.map((keyword: number) => {
          return TREATMENT_LIST.filter((v) => v.keywordId === keyword).map(
            (v) => <div key={v.keywordId}>{`# ${v.name}`}</div>
          );
        })}
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postFooterLeft}>
          <span className={styles.commentNumber}>{data?.commentCount}</span>
          <span
            className={[
              styles.likeNumber,
              data?.likedByCurrentUser ? styles.selected : ""
            ].join(" ")}
            onClick={handleLikeBtn}
          >
            {data?.likeCount}
          </span>
        </div>
        {data?.user?.id == userProfile?.id && (
          <span
            className={styles.postFooterRight}
            onClick={() =>
              openModal(
                <DeleteModal
                  deleteType="post"
                  onConfirm={() => handleDelPost(data?.postId)}
                />
              )
            }
          />
        )}
      </div>
      <div className={styles.commentMain}>
        <div className={styles.commentTitle}>답글</div>
        <div className={styles.commentDiv}>
          <img
            src="/profile.svg"
            alt="user-profile"
            className={styles.profile}
          />
          <input
            className={styles.commentinput}
            placeholder="댓글을 작성해 주세요."
            onKeyDown={handleEnterComment}
            onChange={handleCommentChange}
            value={comment}
          />
        </div>
        <div className={styles.comments}>
          {data?.commentDTOList.map((commentInfo: commentDTOList) => {
            return (
              <div className={styles.comment} key={commentInfo?.id}>
                <div className={styles.commentHeader}>
                  <img
                    src="/profile.svg"
                    alt="user-profile"
                    className={styles.commentProfile}
                  />
                  <div className={styles.commentHeaderMain}>
                    <div>
                      <span className={styles.commentNickName}>
                        {commentInfo?.username}
                      </span>
                      <span className={styles.commentTime}>
                        {formatYYYYMMDDTIME(commentInfo.createDate)}
                      </span>
                    </div>
                    {/* <span className={styles.commentLike} /> */}
                  </div>
                </div>
                <div className={styles.commentContent}>
                  {commentInfo?.content}
                </div>
                {/* <button className={styles.commentBtn}>답글쓰기</button> */}
                {commentInfo?.writtenByCurrentUser === true ? (
                  <button
                    className={styles.commentBtn}
                    onClick={() => handleDelComment(commentInfo?.id)}
                  >
                    삭제하기
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          {data?.commentDTOList?.length == 0 ? (
            <div className={styles.noneComment}>
              <span className={styles.noneCommentTitle}>
                아직 댓글이 없습니다.
              </span>
              <span className={styles.noneCommentContent}>
                댓글을 남겨 소통해보세요.
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal />
    </main>
  );
};
export default PostMain;
