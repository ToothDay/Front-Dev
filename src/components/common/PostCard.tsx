import styles from "@/components/common/PostCard.module.scss";

const PostCard = () => {
  return (
    <div className={styles.post}>
      <div className={styles.postCard}>
        <div className={styles.tagList}>
          <span className={styles.tag}>#인레이</span>
          <span className={styles.tag}>#인레이</span>
          <span className={styles.tag}>#인레이</span>
        </div>
        <div className={styles.postHeader}>
          {/* 프로필 이미지 */}
          <img
            src="/default.svg"
            alt="user-profile"
            className={styles.profile}
          />
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
        <div className={styles.postFooter}>
          <span className={styles.commentNumber}>10</span>
          <span className={styles.likeNumber}>10</span>
        </div>
      </div>
      {/* 게시글 이미지 */}
      <div className={styles.postImage}>
        <img src="/post-default.svg" alt="post-image" />
      </div>
    </div>
  );
};

export default PostCard;
