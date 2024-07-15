import styles from "./Service.module.scss";

const Service = () => {
  return (
    <div className={styles.serviceUse}>
      <div className={styles.serviceBox}>
        <h3 className={styles.serviceTitle}>서비스 이용 </h3>
        <button className={styles.serviceText}>로그아웃</button>
        {/* <button className={styles.serviceText}>회원탈퇴</button> */}
      </div>
    </div>
  );
};

export default Service;
