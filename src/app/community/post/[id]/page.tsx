"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import ImageSwiper from "@/components/common/ImageSwiper";
import Modal from "@/components/modal/Modal";
import DeleteModal from "@/components/modal/DeleteModal";
import { useModalStore } from "@/stores/modal";

const PostMain = () => {
  const { openModal } = useModalStore();
  const imageList = [
    { id: 1, src: "/profile.svg" },
    { id: 2, src: "/profile.svg" },
    { id: 3, src: "/profile.svg" },
    { id: 4, src: "/profile.svg" },
    { id: 5, src: "/image-add.svg" }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.postHeader}>
        <img src="/profile.svg" alt="user-profile" className={styles.profile} />
        <div className={styles.postInfo}>
          <p className={styles.postTitle}>
            레진이랑 인레이 너무 어려워요요요요요요요레진이랑 인레이 너무
            어려워요요요요요요요dddaaaaaaaaaaaaaaaaaaaaㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
          </p>
          <div className={styles.postSubInfo}>
            <span className={styles.nickName}>닉네임</span>
            <span className={styles.time}>2024.07.03 18:00</span>
          </div>
        </div>
      </div>
      <div className={styles.postContentWrapper}>
        <p className={styles.postContent}>
          레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이
          무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는 차이점이
          무엇인지 아시는 레진이랑 인레이ddd 레진이랑 인레이 차이점이 무엇인지
          아시는 레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이
          차이점이 무엇인지 아시는 차이점이 무엇인지 아시는 레진이랑 인레이ddd
        </p>
      </div>
      <ImageSwiper listType="all" imageList={imageList} type="read" />
      <div className={styles.tagDiv}>
        <div>#인레인</div>
        <div>#레진</div>
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postFooterLeft}>
          <span className={styles.commentNumber}>10</span>
          <span className={[styles.likeNumber, styles.selected].join(" ")}>
            10
          </span>
        </div>
        <span
          className={styles.postFooterRight}
          onClick={() => openModal(<DeleteModal deleteType="post" />)}
        />
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
          />
        </div>
        <div className={styles.comments}>
          <div className={styles.comment}>
            <div className={styles.commentHeader}>
              <img
                src="/profile.svg"
                alt="user-profile"
                className={styles.commentProfile}
              />
              <div className={styles.commentHeaderMain}>
                <div>
                  <span className={styles.commentNickName}>닉네임</span>
                  <span className={styles.commentTime}>2024.07.03 18:00</span>
                </div>
                <span className={styles.commentLike} />
              </div>
            </div>
            <div className={styles.commentContent}>
              레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이
              무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는
            </div>
            <button className={styles.commentBtn}>답글쓰기</button>
          </div>
          <div className={styles.comment}>
            <div className={styles.commentHeader}>
              <img
                src="/profile.svg"
                alt="user-profile"
                className={styles.commentProfile}
              />
              <div className={styles.commentHeaderMain}>
                <div>
                  <span className={styles.commentNickName}>닉네임</span>
                  <span className={styles.commentTime}>2024.07.03 18:00</span>
                </div>
                <span className={styles.commentLike} />
              </div>
            </div>
            <div className={styles.commentContent}>
              레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이
              무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는
            </div>
            <button className={styles.commentBtn}>답글쓰기</button>
          </div>
          <div className={styles.comment}>
            <div className={styles.commentHeader}>
              <img
                src="/profile.svg"
                alt="user-profile"
                className={styles.commentProfile}
              />
              <div className={styles.commentHeaderMain}>
                <div>
                  <span className={styles.commentNickName}>닉네임</span>
                  <span className={styles.commentTime}>2024.07.03 18:00</span>
                </div>
                <span className={styles.commentLike} />
              </div>
            </div>
            <div className={styles.commentContent}>
              레진이랑 인레이 차이점이 무엇인지 아시는 레진이랑 인레이 차이점이
              무엇인지 아시는 레진이랑 인레이 차이점이 무엇인지 아시는
            </div>
            <button className={styles.commentBtn}>답글쓰기</button>
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
};
export default PostMain;
