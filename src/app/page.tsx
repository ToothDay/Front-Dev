import styles from "@/app/page.module.scss";
import Link from "next/link";
import Loading from "./loading";

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
      <div className={styles.mainButtonList}>
        <Link href="/welcome">
          <button type="button" className={styles.mainButton}>
            서비스 둘러보기
          </button>
        </Link>
        <Link href="/welcome/login">
          <button type="button" className={styles.mainButton}>
            바로 로그인 하기
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
