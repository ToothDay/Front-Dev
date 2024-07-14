import BtnBottom from "@/components/common/BtnBottom";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";

const CommunityWritePage = () => {
  const arr = [
    "# 잇몸",
    "# 스케일링",
    "# 레진",
    "# 인레이",
    "# 크라운",
    "# 신경",
    "# 임플란트"
  ];
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title="게시글 작성하기" />
      </div>
      <section>
        <article className={styles.titleDiv}>
          <div className={styles.title}>제목</div>
          <input
            className={styles.titleMain}
            placeholder={"최대 70자 이내로 제목을 적어주세요."}
          ></input>
        </article>
        <article className={styles.textDiv}>
          <div className={styles.title}>본문 내용</div>
          <textarea
            className={styles.textMain}
            placeholder={
              "치아, 치과, 구강 건강 등 다양한 내용을 자유롭게 작성해주세요."
            }
          ></textarea>
          <div className={styles.imageDiv}>
            <button className={styles.image}></button>
            <div className={styles.imageNumber}>1/10</div>
          </div>
        </article>
        <article className={styles.keywordDiv}>
          <div className={styles.title}>키워드</div>
          <div className={styles.keywordMain}>
            {arr.map((v) => (
              <span className={styles.keyword}>{v}</span>
            ))}
          </div>
        </article>
        <div className={styles.endBtnDiv}>
          <BtnBottom btnType={false} title="작성 완료" />
        </div>
      </section>
    </main>
  );
};
export default CommunityWritePage;
