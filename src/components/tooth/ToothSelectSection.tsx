"use client";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ToothSelectSection.module.scss";
import Tooth from "./Tooth";
import { ToothType } from "@/constants/toothConstants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToothStore } from "@/stores/tooth";

type ToothSide = {
  value: "left" | "right";
  name: "왼쪽" | "오른쪽";
};

type ToothSelectSectionProps = {
  setSelectedTooth?: (tooth: ToothType) => void;
  setIsDisplayModal?: Dispatch<SetStateAction<boolean>>;
  treatmentToothList?: number[];
};

const ToothSelectSection = ({
  setSelectedTooth,
  setIsDisplayModal,
  treatmentToothList
}: ToothSelectSectionProps) => {
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
  const { setSaveTooth } = useToothStore();

  useEffect(() => {
    if (treatmentToothList) {
      setSaveTooth(treatmentToothList);
    } else {
      setSaveTooth([]);
    }
  }, [toothSelect]);

  return (
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
            <Tooth
              location={toothSelect}
              setSelectedTooth={setSelectedTooth}
              setIsDisplayModal={setIsDisplayModal}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToothSelectSection;
