"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import ImageSwiper from "@/components/common/ImageSwiper";
import { useQuery } from "@tanstack/react-query";
import { getCommunityPost } from "@/api/communityApi";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { useEffect, useState } from "react";
import { formatYYYYMMDDTIME } from "./../../../../util/formatDate";
import Loading from "@/app/loading";
import Modal from "@/components/modal/Modal";
import DeleteModal from "@/components/modal/DeleteModal";
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";
type postMainProps = {
  params: {
    id: number;
  };
};
const PostMain = (props: postMainProps) => {
  const [imageList, setImageList] = useState<{ src: string }[]>([]);
  const { userProfile } = useUserStore();
  const { data, isLoading, error } = useQuery({
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
          <span className={[styles.likeNumber, styles.selected].join(" ")}>
            {data?.likeCount}
          </span>
        </div>
        {data.id == userProfile.id && (
          <span
            className={styles.postFooterRight}
            onClick={() => openModal(<DeleteModal deleteType="post" />)}
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
