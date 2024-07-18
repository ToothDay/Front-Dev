import Header from "@/components/common/Header";
import styles from "./page.module.scss";
import MedicalWrite from "@/components/medical/MedicalWrite";

const MedicalWritePage = () => {
  return (
    <main className={styles.main}>
      <Header />
      <MedicalWrite />
    </main>
  );
};

export default MedicalWritePage;
