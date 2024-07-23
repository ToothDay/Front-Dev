import styles from "@/components/common/PostCard.module.scss";
import { useUserStore } from "@/stores/user";
import { formatYYYYMMDDTIME } from "@/util/formatDate";

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
};

const TagList = () => (
  <div className={styles.tagList}>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
  </div>
);

const PostHeader = ({ type, data }: PropsPost) => (
  <div className={styles.postHeader}>
    {type !== "post" && (
      <img
        src={`http://3.34.135.181:8000/upload/profileImage/${data?.user?.profileImageUrl}`}
        alt="user-profile"
        className={styles.profile}
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

const PostContent = ({ type, data }: PropsPost) => (
  <div className={styles.postContentWrapper}>
    <p className={styles.postContent}>{data?.content}</p>
    {type === "community" && data?.imageUrl && (
      <img
        src={`http://3.34.135.181:8000/upload/${data.imageUrl[0]}`}
        alt="post-image"
      />
    )}
  </div>
);

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

const PostCard = ({ type, data }: PropsPost) => {
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
