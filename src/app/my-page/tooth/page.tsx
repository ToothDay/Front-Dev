import Tooth from "@/components/tooth/Tooth";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";

const MyTooth = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.info}>
        <p className={styles.infoTitle}>-- 님의 현재 치아 상태</p>
        <p className={styles.infoText}>
          최근 변경 사항이 있다면 <br />
          치아를 눌러서 수정해 주세요
        </p>
      </div>
      <section className={styles.toothContainer}>
        <div className={styles.toothBox}>
          <span className={styles.boxTitle}>왼쪽 치아</span>
          <Tooth location="left" />
        </div>
        <div className={styles.toothBox}>
          <span className={styles.boxTitle}>오른쪽 치아</span>
          <Tooth location="right" />
        </div>
      </section>
      <button type="button" className={styles.addButton}>
        추가하기
      </button>
    </main>
  );
};

export default MyTooth;
