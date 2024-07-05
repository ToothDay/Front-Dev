import Header from "@/components/common/Header";
import styles from "./page.module.scss";

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
  console.log("searchParams", params);
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title={HEADER_TITLE[params.type]} />
      </div>
    </main>
  );
};

export default MyActivity;
