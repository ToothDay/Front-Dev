import styles from "@/components/common/BtnBottom.module.scss";

type PropsBtn = {
  btnType: boolean;
  title: string;
};

const BtnBottom = ({ btnType, title }: PropsBtn) => {
  return (
    <div className={styles.saveBtnDiv}>
      <button className={`${styles.saveBtn} ${btnType ? styles.active : ""}`}>
        {title}
      </button>
    </div>
  );
};

export default BtnBottom;
