import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import ScaleButton from "@/components/motion/ScaleButton";
import Link from "next/link";
import Login from "@/components/Login";
import { cookies } from "next/headers";

type PropsPage = {
  searchParams: {
    type?: "guest";
  };
};

const LoginPage = ({ searchParams }: PropsPage) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwtToken");

  return (
    <main className={styles.main}>
      {searchParams.type === "guest" && (
        <div className={styles.header}>
          <Header />
        </div>
      )}
      <section className={styles.contentSection}>
        <div className={styles.logoWrapper}>
          <img src="/main/logo-img.png" alt="logo" className={styles.logo} />
          <img
            src="/main/logo-text.png"
            alt="logo-text"
            className={styles.logoTitle}
          />
          <p className={styles.text}>
            치과 진료 내역을 기록하여 치아 상태를 <br />
            관리하고 다른 사람들과 치아에 관해 <br />
            소통하며 즐겨보세요!
          </p>
        </div>
        <div className={styles.loginWrapper}>
          <ScaleButton>
            <Login hasToken={!!token?.value} />
          </ScaleButton>
          <ScaleButton>
            <Link href="/community">
              <p className={[styles.loginBtn, styles.noLogin].join(" ")}>
                로그인 없이 시작하기
              </p>
            </Link>
          </ScaleButton>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
