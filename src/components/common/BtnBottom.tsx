import styles from "@/components/common/BtnBottom.module.scss";
import MyPage from "./../../app/my-page/page";

type PropsBtn = {
  btnType: "myPage" | "canSave";
};

const BtnBottom = ({ btnType }: PropsBtn) => {
  return (
    <div className={styles.saveBtnDiv}>
      {btnType === "myPage" && (
        <button className={styles.saveBtn}>저장하기</button>
      )}
      {btnType === "canSave" && (
        <button className={styles.canSaveBtn}>저장하기</button>
      )}
    </div>
  );
};

export default BtnBottom;
