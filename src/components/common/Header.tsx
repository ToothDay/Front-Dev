"use client";

import styles from "@/components/common/Header.module.scss";
import { useRouter } from "next/navigation";

type PropsHeader = {
  title?: string;
  openModal?: () => void;
};

const Header = ({ title, openModal }: PropsHeader) => {
  const router = useRouter();

  const handleBack = () => {
    if (openModal) {
      openModal();
    } else {
      router.back();
    }
  };
  return (
    <header className={styles.header}>
      <button className={styles.beforeButton} onClick={handleBack}>
        이전
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
