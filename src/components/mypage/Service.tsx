"use client";
import styles from "./Service.module.scss";
import { useModalStore } from "@/stores/modal";
import { useRouter } from "next/navigation";
import AccountActionModal from "../modal/AccountActionModal";
import { useState } from "react";
import Loading from "@/app/loading";
import SimpleModal from "../modal/SimpleModal";

const Service = () => {
  const router = useRouter();
  const { isOpen, openModal } = useModalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cancelMembership = () => {
    openModal(<AccountActionModal accountType="userDelete" />);
  };

  const askOpen = () => {
    openModal(<SimpleModal type="email" answer="확인" />);
  };

  const goTermsOfService = () => {
    setIsLoading(true);
    router.push("/my-page/terms");
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const logout = () => {
    openModal(<AccountActionModal accountType="logout" />);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.serviceUse}>
        <div className={styles.serviceBox}>
          <h3 className={styles.serviceTitle}>서비스 이용 </h3>
          <button className={styles.serviceText} onClick={goTermsOfService}>
            이용약관
          </button>
          <button className={styles.serviceText} onClick={logout}>
            로그아웃
          </button>
          <button className={styles.serviceText} onClick={cancelMembership}>
            회원탈퇴
          </button>
          <button className={styles.serviceText} onClick={askOpen}>
            문의하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Service;
