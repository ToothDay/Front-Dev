import styles from "@/app/page.module.scss";

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <img
          src="/main/logo-img.png"
          alt="ToothDay-logo"
          className={styles.logo}
        />
        <img src="/main/logo-text.png" alt="ToothDay" className={styles.text} />
      </h1>
      <img
        src="/main/main-top.png"
        alt="background"
        className={styles.backTop}
      />
      <div className={styles.backBottom}></div>
      <div className={styles.mainButton}>
        <button type="button" className={styles.button}>
          서비스 둘러보기
        </button>
        <button type="button" className={styles.button}>
          바로 로그인 하기
        </button>
      </div>
    </main>
  );
};

export default Home;
