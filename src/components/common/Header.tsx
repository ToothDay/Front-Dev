"use client";

import styles from "@/components/common/Header.module.scss";
import { useRouter } from "next/navigation";

type PropsHeader = {
  title?: string;
};

const Header = ({ title }: PropsHeader) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <header className={styles.header} onClick={handleBack}>
      <button className={styles.beforeButton}>이전</button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
