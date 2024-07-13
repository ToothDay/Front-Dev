import OnBoarding from "@/components/welcome/OnBoarding";
import styles from "./page.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

const Welcome = () => {
  return (
    <main className={styles.main}>
      <OnBoarding />
    </main>
  );
};

export default Welcome;
