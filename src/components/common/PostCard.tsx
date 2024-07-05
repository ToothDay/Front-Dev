import styles from "@/components/common/PostCard.module.scss";

type PropsPost = {
  type: "post" | "comment" | "like";
};

const PostCard = ({ type }: PropsPost) => {
  return (
    <div className={styles.postWrapper}>
      <div className={styles.post}>
        <div className={styles.postCard}>
          <div className={styles.tagList}>
            <span className={styles.tag}>#인레이</span>
            <span className={styles.tag}>#인레이</span>
            <span className={styles.tag}>#인레이</span>
          </div>
          <div className={styles.postHeader}>
            {type !== "post" && (
              <img
                src="/default.svg"
                alt="user-profile"
                className={styles.profile}
              />
            )}
            <div className={styles.postInfo}>
              <p className={styles.postTitle}>Post Card</p>
              <span className={styles.time}>2024.07.03 18:00</span>
            </div>
          </div>
          <p className={styles.postContent}>
            레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이
            무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는 차이점이
            무엇인지 아시는 레진이랑 인레이ddd 레진이랑 인레이 차이점이 무엇인지
            아시는 레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이
            차이점이 무엇인지 아시는 차이점이 무엇인지 아시는 레진이랑 인레이ddd
          </p>
          {type !== "comment" && (
            <div className={styles.postFooter}>
              <span className={styles.commentNumber}>10</span>
              {/* 데이터의 기능이 어떨지 몰라 일단 선택되었을때 클래스도 함께 추가해 놓음 selected 조건 혹은 케이스로 분기처리 가능  */}
              <span className={[styles.likeNumber, styles.selected].join(" ")}>
                10
              </span>
            </div>
          )}
        </div>
        {type === "post" && (
          <div className={styles.postImage}>
            <img src="/post-default.svg" alt="post-image" />
          </div>
        )}
      </div>
      {type === "comment" && (
        <div className={styles.comment}>
          <span className={styles.commentTitle}>내 댓글</span>
          <p className={styles.commentText}>
            좋은 정보 감사합니다. 도움 많이 됐습니다. 좋은 정보 감사합니다! 도움
            많이 됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다. 좋은 정보
            감사합니다! 도움 많이 됐습니다. 좋은 정보 감tㅅ움 많이 됐습니다.
            좋은 정보 감사합니다! 도움 많이 됐습니다. 좋은 정보 감tㅅ움 많이
            됐습니다. 좋은 정보 감사합니다! 도움 많이 됐습니다. 좋은 정보
            감tㅅ움 많이 됐습니다. 좋은 정보 감사합니다! 도움 많이 됐습니다.
            좋은 정보 감tㅅ
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
