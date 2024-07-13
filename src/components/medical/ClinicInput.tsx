import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ClinicInput.module.scss";

type PropsClinicInput = {
  isClinic: boolean;
  setIsClinic: (value: boolean) => void;
};

const ClinicInput = ({ isClinic, setIsClinic }: PropsClinicInput) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsClinic(false);
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
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
      }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      ref={wrapperRef}
    >
      <label className={styles.writeLabel}>
        진료를 진행한 치과를 <br /> 설정해 주세요.
      </label>
      <div className={styles.inputField}>
        <div
          className={[styles.clinicInput, isClinic ? styles.openList : ""].join(
            " "
          )}
        >
          <input
            type="text"
            className={styles.searchClinic}
            placeholder="치과명으로 찾아주세요."
          />
        </div>
        <AnimatePresence>
          {isClinic && (
            <motion.ul
              className={styles.dentalClinicList}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <li className={styles.clinicItem}>
                <div className={styles.clinicInfo}>
                  <span className={styles.clinicName}>치과1</span>
                  <span className={styles.clinicLocation}>서울시 강남구</span>
                </div>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
        <img src="/search-icon.svg" alt="search" className={styles.inputIcon} />
      </div>
    </motion.div>
  );
};

export default ClinicInput;
