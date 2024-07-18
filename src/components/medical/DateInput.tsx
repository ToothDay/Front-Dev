import { AnimatePresence, motion } from "framer-motion";
import styles from "./DateInput.module.scss";
import CustomCalendar from "../common/CustomCalendar";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatKoreaDate } from "@/util/formatDate";

type PropsDateInput = {
  isCalendar: boolean;
  setIsCalendar: (value: boolean) => void;
};
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const slideInVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const DateInput = ({ isCalendar, setIsCalendar }: PropsDateInput) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [value, setValue] = useState<Value>(new Date());

  const formattedDate = useMemo(() => {
    if (value instanceof Date) {
      return formatKoreaDate(value);
    }
    return "";
  }, [value]);

  useEffect(() => {
    setSelectedValue(formattedDate);
  }, [formattedDate]);

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

  const handleCalenderClick = () => {
    if (selectedValue !== "") {
      setIsCalendar(false);
    }
  };

  const handleInputClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCalendar(!isCalendar);
  };

  return (
    <motion.div
      className={styles.writeWrapper}
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      ref={wrapperRef}
    >
      <label className={styles.writeLabel}>
        진료를 진행한 날짜를 <br /> 선택해 주세요.
      </label>
      <div className={styles.inputField} onClick={handleInputClick}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="날짜를 선택해 주세요."
          readOnly
          value={selectedValue}
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
            onClick={handleCalenderClick}
          >
            <CustomCalendar value={value} onChange={setValue} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DateInput;
