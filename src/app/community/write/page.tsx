import styles from "./page.module.scss";
import Header from "@/components/common/Header";

const CommunityWritePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title="게시글 작성하기" />
      </div>
    </main>
  );
};
export default CommunityWritePage;
