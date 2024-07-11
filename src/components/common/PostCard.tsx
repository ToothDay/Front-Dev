import styles from "@/components/common/PostCard.module.scss";

type PropsPost = {
  type: "post" | "comment" | "like" | "community";
};

const TagList = () => (
  <div className={styles.tagList}>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
    <span className={styles.tag}>#인레이</span>
  </div>
);

const PostHeader = ({ type }: PropsPost) => (
  <div className={styles.postHeader}>
    {type !== "post" && (
      <img src="/profile.svg" alt="user-profile" className={styles.profile} />
    )}
    <div className={styles.postInfo}>
      <p className={styles.postTitle}>
        레진이랑 인레이 너무 어려워요요요요요요요레진이랑 인레이 너무
        어려워요요요요요요요ddd
      </p>
      <div className={styles.postSubInfo}>
        {type !== "post" && <span className={styles.nickName}>닉네임</span>}
        <span className={styles.time}>2024.07.03 18:00</span>
      </div>
    </div>
  </div>
);

const PostContent = ({ type }: PropsPost) => (
  <div className={styles.postContentWrapper}>
    <p className={styles.postContent}>
      레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지
      아시는 레진이랑 인레이 차이점이 무엇인지 아시는 차이점이 무엇인지 아시는
      레진이랑 인레이ddd 레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑
      인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는
      차이점이 무엇인지 아시는 레진이랑 인레이ddd
    </p>
    {type === "community" && <img src="/post-default.png" alt="post-image" />}
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

const PostCard = ({ type }: PropsPost) => {
  return (
    <div className={[styles.postWrapper, styles[`${type}Type`]].join(" ")}>
      <div className={styles.postCard}>
        {type !== "community" && <TagList />}
        <PostHeader type={type} />
      </div>
      <div className={styles.post}>
        <PostContent type={type} />
        {type !== "community" && (
          <div className={styles.postImage}>
            <img src="/image-default.png" alt="post-image" />
          </div>
        )}
      </div>
      {type !== "comment" && (
        <div className={styles.postFooter}>
          <span className={styles.commentNumber}>10</span>
          <span className={[styles.likeNumber, styles.selected].join(" ")}>
            10
          </span>
        </div>
      )}
      {type === "comment" && <Comment />}
    </div>
  );
};

export default PostCard;
