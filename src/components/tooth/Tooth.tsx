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
};

const Tooth = ({ location, setIsDisplayModal }: PropsTooth) => {
  const topTooth = location === "left" ? LEFT_TOP : RIGHT_TOP;
  const bottomTooth = location === "left" ? LEFT_BOTTOM : RIGHT_BOTTOM;

  const handleTooth = () => {
    setIsDisplayModal && setIsDisplayModal((prev) => !prev);
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
            onClick={() => handleTooth()}
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
            onClick={() => handleTooth()}
          >
            {tooth.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tooth;
