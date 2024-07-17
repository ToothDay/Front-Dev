import Header from "@/components/common/Header";
import styles from "./page.module.scss";

const Terms = () => {
  return (
    <main className={styles.main}>
      <Header title="서비스 이용약관" />
      <section className={styles.terms}>
        <article className={styles.termArticle}>
          <header className={styles.termHeader}>제 1조 (목적)</header>
          <p className={styles.termContent}>
            이 약관은 인터넷서비스(투스데이)의 이용 조건 및 절차에 관한 기본적인
            사항을 규정함을 목적으로 합니다.
          </p>
        </article>
        <article className={styles.termArticle}>
          <header className={styles.termHeader}>
            제 2조 (약관의 효력 및 변경)
          </header>
          <p className={styles.termContent}>
            1. 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게
            공지함으로써 효력을 발생합니다.
            <br />
            2. 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과
            같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
          </p>
        </article>
        <article className={styles.termArticle}>
          <header className={styles.termHeader}>제 3조 (개인정보 보호)</header>
          <p className={styles.termContent}>
            1. 본 서비스는 수집된 개인정보를 회원의 동의없이 타인에게 누설, 공개
            또는 배포할 수 없으며, 서비스관련 업무 이외의 상업적 목적으로 사용할
            수 없습니다.
            <br />
            2. 회원가입 시 입력된 개인정보는 3년동안 보관하며 1년 이상 활동이
            없을 시 휴면 계정으로 전환됩니다.
          </p>
        </article>
        <article className={styles.termArticle}>
          <header className={styles.termHeader}>제 4조 (회원 탈퇴)</header>
          <p className={styles.termContent}>
            1. 화원 탈퇴를 하는 경우 서비스 이용 계약이 자동으로 해지됩니다.
            <br />
            2. 탈퇴 시 작성한 진료기록 및 게시글, 댓글이 삭제 처리됩니다.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Terms;
