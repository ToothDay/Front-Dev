import styles from "@/components/modal/ToothWriteModal.module.scss";
import BtnBottom from "../common/BtnBottom";

type ToothWriteModalProps = {
  teethName: string;
  icon: string;
};

const ToothWriteModal = ({ teethName, icon }: ToothWriteModalProps) => {
  return (
    <div className={styles.write}>
      <div className={styles.writeTitle}>
        <img src={icon} alt="tooth" className={styles.teethImage} />
        <p className={styles.teethName}>{teethName}</p>
        <p className={styles.subText}>
          해당되는 치료를 선택해 주세요 <br /> 최대 3개까지 중복 가능합니다.
        </p>
      </div>
      <div className={styles.teethBox}>
        <div className={styles.teethInfo}>
          {/* 선택된 값 selected 조건 붙을 시 class 설정해주세요! */}
          <div className={[styles.info, styles.selected].join(" ")}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          {/* 데이터 맵핑후 삭제 예정 */}
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
          <div className={styles.info}>
            <span className={styles.infoTitle}>임플란트</span>
            <span className={styles.infoTotal}>300,000</span>
          </div>
        </div>
      </div>
      <BtnBottom btnType={false} title="기록 완료" />
    </div>
  );
};

export default ToothWriteModal;
