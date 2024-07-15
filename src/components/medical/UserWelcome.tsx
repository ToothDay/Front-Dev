"use client";
import { useUserStore } from "@/stores/user";
import styles from "./UserWelcome.module.scss";
import Link from "next/link";

const UserWelcome = () => {
  const { userProfile } = useUserStore();
  console.log(userProfile);
  return (
    <section className={styles.medicalSection}>
      <div className={styles.myMedical}>
        <div className={styles.medicalText}>
          <span className={styles.title}>안녕하세요</span>
          <span className={styles.name}>{userProfile?.name || "-"}님!</span>
          <div className={styles.noDataText}>
            <span className={styles.text}>
              최근 진료 기록이
              <br />
              아직 없습니다.
            </span>
          </div>
        </div>
        <Link href="/medical/write">
          <button type="button" className={styles.recordButton}>
            진료 기록하러 가기
          </button>
        </Link>
      </div>
    </section>
  );
};

export default UserWelcome;
