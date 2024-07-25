"use client";
import { useUserStore } from "@/stores/user";
import styles from "./UserWelcome.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/app/loading";

type UserWelcomeProps = {
  hasMyData: boolean;
};

const UserWelcome = ({ hasMyData }: UserWelcomeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userProfile } = useUserStore();
  const router = useRouter();

  const handleButtonClick = () => {
    setIsLoading(true);
    router.push("/medical/write");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <section className={styles.medicalSection}>
        <div className={styles.myMedical}>
          <div className={styles.medicalText}>
            <span className={styles.title}>안녕하세요</span>
            <span className={styles.name}>
              {userProfile?.username || "회원"}님!
            </span>
            {hasMyData && (
              <div className={styles.noDataText}>
                <span className={styles.text}>
                  최근 진료 기록이
                  <br />
                  아직 없습니다.
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className={styles.recordButton}
            onClick={handleButtonClick}
          >
            진료 기록하러 가기
          </button>
        </div>
      </section>
    </>
  );
};

export default UserWelcome;
