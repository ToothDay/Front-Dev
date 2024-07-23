import { motion } from "framer-motion";
import styles from "./ShareOption.module.scss";
import { useUserStore } from "@/stores/user";
import { useMedicalWriteStore, useModifyData } from "@/stores/medicalWrite";
import { useEffect } from "react";

type PropsShareOption = {
  isShare: boolean;
  setIsShare: (value: boolean) => void;
};

type ShareButton = {
  label: string;
  value: boolean;
};

const ShareOption = ({ isShare, setIsShare }: PropsShareOption) => {
  const shareButton: ShareButton[] = [
    { label: "네", value: true },
    { label: "아니요", value: false }
  ];

  const { userProfile } = useUserStore();
  const { updateIsShared } = useMedicalWriteStore();
  const { isShared: isSharedStore } = useModifyData();

  useEffect(() => {
    updateIsShared(isShare);
  }, [isShare]);

  useEffect(() => {
    if (isSharedStore !== undefined) {
      setIsShare(isSharedStore);
    }
  }, [isSharedStore]);

  return (
    <motion.div
      className={styles.writeWrapper}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <label className={styles.writeLabel}>
        다른 사용자들에게 <br /> 기록을 공유할까요?
      </label>
      <span className={styles.helperText}>
        {userProfile?.username || "회원"} 님의 기록이 다른 사용자들에게
        <br />
        좋은 정보가 될 수 있어요!
      </span>
      <div className={[styles.toothSelect, styles.share].join(" ")}>
        {shareButton.map((share) => {
          return (
            <button
              type="button"
              key={share.label}
              className={[
                styles.treatmentButton,
                share.value === isShare ? styles.selected : ""
              ].join(" ")}
              onClick={() => setIsShare(share.value)}
            >
              {share.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ShareOption;
