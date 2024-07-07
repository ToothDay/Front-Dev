import styles from "@/components/common/NoData.module.scss";

type PropsNoData = {
  type: "post" | "like" | "comment";
};

type NoDataType = {
  [key in PropsNoData["type"]]: {
    title: string;
    content: string | JSX.Element;
  };
};

const NO_DATA: NoDataType = {
  post: {
    title: "아직 작성한 글이 없습니다.",
    content: (
      <>
        커뮤니티에서 작성한 글이 <br />
        여기에 저장됩니다.
      </>
    )
  },
  like: {
    title: "아직 좋아요 누른 글이 없습니다.",
    content: (
      <>
        커뮤니티 게시된 글에 하트를 누르면 <br />
        여기에 저장됩니다.
      </>
    )
  },
  comment: {
    title: "아직 댓글 단 글이 없습니다.",
    content: (
      <>
        커뮤니티 게시된 글에 댓글을 달면 <br />
        여기에 저장됩니다.
      </>
    )
  }
};

const NoData = ({ type }: PropsNoData) => {
  const { title, content } = NO_DATA[type];

  return (
    <div className={styles.noDataWrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default NoData;
