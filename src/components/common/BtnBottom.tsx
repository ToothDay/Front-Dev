import styles from "@/components/common/BtnBottom.module.scss";
import MyPage from "./../../app/my-page/page";

type PropsBtn = {
  btnType: false | true;
  title: string;
};

const BtnBottom = ({ btnType, title }: PropsBtn) => {
  return (
    <div className={styles.saveBtnDiv}>
      <button className={btnType ? styles.canSaveBtn : styles.saveBtn}>
        {title}
      </button>
    </div>
  );
};

export default BtnBottom;
