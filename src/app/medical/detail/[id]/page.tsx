import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import ToothSelectSelection from "@/components/tooth/ToothSelectSection";

const MedicalDetail = () => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.infoSection}>
        <div className={styles.address}>서울시 동작구 상도동</div>
        <div className={styles.title}>날아라 치과에서</div>
        <div className={styles.title}>2021년 5월 10일 수요일에</div>
        <div className={styles.treatment}>
          <span className={styles.treatmentName}>스케일링</span>
          <span className={styles.treatmentName}>인레이 2개</span>
          <span className={styles.treatmentName}>크라운 2개</span>
        </div>
        <div className={styles.title}>치료 완료했습니다</div>
      </section>
      <section className={styles.priceSection}>
        <div className={styles.totalPrice}>
          <span className={styles.label}>총 가격</span>
          <span className={styles.price}>1,2700000원</span>
        </div>
        <div className={styles.detailPrices}>
          <div className={styles.priceItem}>
            <span className={styles.label}>내부 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>잇몸 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>인레이 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>크라운 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>크라운 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>크라운 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>크라운 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.label}>크라운 진료비</span>
            <span className={styles.price}>1,2000000원</span>
          </div>
        </div>
      </section>
      <section className={styles.toothSection}>
        <span className={styles.title}>치아 상태</span>
        <ToothSelectSelection />
      </section>
    </main>
  );
};

export default MedicalDetail;
