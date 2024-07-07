import styles from "@/components/common/BtnBottom.module.scss";

// type PropsCard = {
//   cardType: "myPage" | "other";
// };

const BtnBottom = () => {
  return (
    <div className={styles.saveBtnDiv}>
      <button className={styles.saveBtn}>저장하기</button>
    </div>
  );
};

export default BtnBottom;
