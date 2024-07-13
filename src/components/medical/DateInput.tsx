import { motion } from "framer-motion";
import styles from "./DateInput.module.scss";

type PropsDateInput = {
  isCalendar?: boolean;
  setIsCalendar?: (value: boolean) => void;
};

const DateInput = ({ isCalendar, setIsCalendar }: PropsDateInput) => {
  return (
    <motion.div
      className={styles.writeWrapper}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
      }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <label className={styles.writeLabel}>
        진료를 진행한 날짜를 <br /> 선택해 주세요.
      </label>
      <div className={styles.inputField}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="날짜를 선택해 주세요."
        />
        <img
          src="/date-icon.svg"
          alt="date"
          aria-hidden="true"
          className={styles.inputIcon}
        />
      </div>
    </motion.div>
  );
};

export default DateInput;
