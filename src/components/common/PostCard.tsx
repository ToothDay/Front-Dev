import { postLike } from "@/api/communityApi";
import styles from "@/components/common/PostCard.module.scss";
import { formatYYYYMMDDTIME } from "@/util/formatDate";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

type PropsPost = {
  type: "post" | "comment" | "like" | "community";
  data?: {
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
  refetch?: any;
};

const TagList = () => (
  <div className={styles.tagList}>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
  </div>
);

const PostHeader = ({ type, data }: PropsPost) => {
  const [imageUrl, setImageUrl] = useState(
    data?.user?.profileImageUrl
      ? data?.user?.profileImageUrl.includes("http")
        ? `${data?.user?.profileImageUrl}`
        : `http://3.34.135.181:8000/upload${data?.user?.profileImageUrl}`
      : `/profile.svg`
  );
  return (
    <div className={styles.postHeader}>
      {type !== "post" && (
        <Image
          src={imageUrl}
          alt="user-profile"
          className={styles.nextImage}
          width={34}
          height={34}
          onError={(e) => {
            setImageUrl("/profile.svg");
            console.error(e + "image fetch error");
          }}
        />
      )}
      <div className={styles.postInfo}>
        <p className={styles.postTitle}>{data?.title}</p>
        <div className={styles.postSubInfo}>
          {type !== "post" && (
            <span className={styles.nickName}>{data?.user?.username}</span>
          )}
          <span className={styles.time}>
            {data?.createDate && formatYYYYMMDDTIME(data?.createDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

const PostContent = ({ type, data }: PropsPost) => {
  const [imageUrl, setImageUrl] = useState(
    data?.imageUrl[0]
      ? `http://3.34.135.181:8000/upload/${data?.imageUrl[0]}`
      : `/default-post.png`
  );
  return (
    <div className={styles.postContentWrapper}>
      <p className={styles.postContent}>{data?.content}</p>
      {type === "community" && data?.imageUrl && data.imageUrl.length > 0 && (
        <div className={styles.postContentImg}>
          <Image
            src={imageUrl}
            alt="post-profile"
            width={340}
            height={135}
            loading="lazy"
            layout="fixed"
            objectFit="cover"
            onError={(e) => {
              setImageUrl("/default-post.png");
              console.error(e + "image fetch error");
            }}
          />
        </div>
      )}
    </div>
  );
};

const Comment = () => (
  <div className={styles.comment}>
    <span className={styles.commentTitle}>내 댓글</span>
    <p className={styles.commentText}>
      좋은 정보 감사합니다. 도움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이
      됐습니다. 좋은 정보 감tㅅ
    </p>
  </div>
);

const PostCard = ({ type, data, refetch }: PropsPost) => {
  const mutation = useMutation({
    mutationFn: (postId: number) => postLike(postId),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => console.log(e)
  });
  const handleLikeBtn = async () => {
    if (!data) return;
    mutation.mutate(data.postId);
  };
  return (
    <div className={[styles.postWrapper, styles[`${type}Type`]].join(" ")}>
      <div className={styles.postCard}>
        {type !== "community" && <TagList />}
        <PostHeader type={type} data={data} />
      </div>
      <div className={styles.post}>
        <PostContent type={type} data={data} />
        {type !== "community" && (
          <div className={styles.postImage}>
            <img src="/image-default.png" alt="post-image" />
          </div>
        )}
      </div>
      {type !== "comment" && (
        <div className={styles.postFooter}>
          <span className={styles.commentNumber}>{data?.commentCount}</span>
          <span
            className={[
              styles.likeNumber,
              data?.likedByCurrentUser ? styles.selected : ""
            ].join(" ")}
            onClick={(e) => {
              e.preventDefault();
              handleLikeBtn();
            }}
          >
            {data?.likeCount}
          </span>
        </div>
      )}
      {type === "comment" && <Comment />}
    </div>
  );
};

export default PostCard;
