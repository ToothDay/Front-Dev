"use client";
import { RefObject, useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";

type ScrollToTopProps = {
  mainRef: RefObject<HTMLDivElement>;
};

const ScrollToTop = ({ mainRef }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (mainRef.current && mainRef.current.scrollTop > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const main = mainRef.current;
    if (main) {
      main.addEventListener("scroll", handleScroll);
      return () => {
        main.removeEventListener("scroll", handleScroll);
      };
    }
  }, [mainRef]);

  return (
    <>
      {isVisible && (
        <button className={styles.scroll} onClick={scrollToTop}>
          <span className={styles.arrow}>스크롤 up</span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
