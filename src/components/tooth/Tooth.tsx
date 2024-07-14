"use client";
import styles from "@/components/tooth/Tooth.module.scss";
import {
  LEFT_TOP,
  LEFT_BOTTOM,
  RIGHT_TOP,
  RIGHT_BOTTOM
} from "@/constants/toothConstants";

type PropsTooth = {
  location: "left" | "right";
  setIsDisplayModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTooth?: (value: {
    name: string;
    number: number;
    icon: string;
  }) => void;
};

const Tooth = ({
  location,
  setIsDisplayModal,
  setSelectedTooth
}: PropsTooth) => {
  const topTooth = location === "left" ? LEFT_TOP : RIGHT_TOP;
  const bottomTooth = location === "left" ? LEFT_BOTTOM : RIGHT_BOTTOM;

  const handleTooth = (name: string, number: number, icon: string) => {
    setIsDisplayModal && setIsDisplayModal((prev) => !prev);
    setSelectedTooth && setSelectedTooth({ name, number, icon });
  };

  return (
    <div className={styles.toothWrap}>
      <div className={[styles.topTooth, styles[location]].join(" ")}>
        {topTooth.map((tooth) => (
          <div
            className={[
              styles[`toothTop${tooth.number}`]
              // selectedTooth === tooth.number ? styles.selected : ""
            ].join(" ")}
            key={tooth.number}
            onClick={() => handleTooth(tooth.name, tooth.number, tooth.icon)}
          >
            {tooth.name}
          </div>
        ))}
      </div>
      <div className={[styles.bottomTooth, styles[location]].join(" ")}>
        {bottomTooth.map((tooth) => (
          <div
            className={[
              styles[`toothBottom${tooth.number}`]
              // selectedTooth === tooth.number ? styles.selected : ""
            ].join(" ")}
            key={tooth.number}
            onClick={() => handleTooth(tooth.name, tooth.number, tooth.icon)}
          >
            {tooth.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tooth;
