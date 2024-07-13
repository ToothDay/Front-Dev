import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tooth from "../tooth/Tooth";
import styles from "./ToothSelection.module.scss";

type ToothSide = {
  value: "left" | "right";
  name: "왼쪽" | "오른쪽";
};

const ToothSelection = () => {
  const [toothSelect, setToothSelect] = useState<"left" | "right">("left");
  const toothSide: ToothSide[] = [
    {
      value: "left",
      name: "왼쪽"
    },
    {
      value: "right",
      name: "오른쪽"
    }
  ];

  return (
    <motion.div
      className={styles.writeWrapper}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <label className={styles.writeLabel}>
        치아를 선택해서 받은 치료를 <br /> 설정해 주세요.
      </label>
      <span className={styles.helperText}>
        스케일링과 잇몸치료는 설정에서 제외됩니다.
      </span>
      <div className={styles.toothItem}>
        <div className={styles.toothSelect}>
          {toothSide.map((side) => (
            <button
              type="button"
              key={side.value}
              className={[
                styles.treatmentButton,
                side.value === toothSelect ? styles.selected : ""
              ].join(" ")}
              onClick={() => setToothSelect(side.value)}
            >
              {side.name}
            </button>
          ))}
        </div>
        <div className={styles.toothImg}>
          <AnimatePresence mode="wait">
            <motion.div
              key={toothSelect}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Tooth location={toothSelect} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ToothSelection;
