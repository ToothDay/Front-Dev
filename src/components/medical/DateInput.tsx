import { AnimatePresence, motion } from "framer-motion";
import styles from "./DateInput.module.scss";
import CustomCalendar from "../common/CustomCalendar";
import { useEffect, useRef } from "react";

type PropsDateInput = {
  isCalendar: boolean;
  setIsCalendar: (value: boolean) => void;
};

const slideInVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const DateInput = ({ isCalendar, setIsCalendar }: PropsDateInput) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <motion.div
      className={styles.writeWrapper}
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <label className={styles.writeLabel}>
        진료를 진행한 날짜를 <br /> 선택해 주세요.
      </label>
      <div
        className={styles.inputField}
        onClick={() => {
          setIsCalendar(!isCalendar);
        }}
      >
        <input
          type="text"
          className={styles.formInput}
          placeholder="날짜를 선택해 주세요."
          readOnly
        />
        <img
          src="/date-icon.svg"
          alt="date"
          aria-hidden="true"
          className={styles.inputIcon}
        />
      </div>
      <AnimatePresence>
        {isCalendar && (
          <motion.div
            className={styles.calendar}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            ref={wrapperRef}
          >
            <CustomCalendar />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DateInput;
