"use client";
import { useUserStore } from "@/stores/user";
import styles from "./UserWelcome.module.scss";
import Link from "next/link";
import { fetchUserProfile } from "@/api/authService";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import Error from "../error/Error";

const UserWelcome = () => {
  const { userProfile, setUserProfile } = useUserStore();

  const { data, error, isLoading } = useQuery({
    queryKey: "userProfile",
    queryFn: () => fetchUserProfile(),
    onSuccess: (data) => {
      const profile = {
        id: data.id,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        username: data.username
      };
      setUserProfile(profile);
    },
    onError: (error) => {
      console.error("Failed to fetch user profile", error);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType={"error"} />;
  }

  return (
    <section className={styles.medicalSection}>
      <div className={styles.myMedical}>
        <div className={styles.medicalText}>
          <span className={styles.title}>안녕하세요</span>
          <span className={styles.name}>{userProfile?.username || "-"}님!</span>
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
