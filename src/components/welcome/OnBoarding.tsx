"use client";
import styles from "./OnBoarding.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Controller, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/scss/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OnBoarding = () => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();

  const handleMainButton = () => {
    if (currentIndex === 2) {
      router.push("/welcome/login");
    }
    if (firstSwiper && secondSwiper) {
      firstSwiper.slideNext();
    }
  };

  const handleSlideChange = () => {
    setCurrentIndex(firstSwiper?.activeIndex || 0);
  };

  return (
    <div className={styles.onBoarding}>
      <div className={styles.swiperImg}>
        <Swiper
          id="firstSwiper"
          modules={[Autoplay, Pagination, Controller]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          className={styles.first}
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            stopOnLastSlide: true
          }}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            <div className={styles.firstImage}>
              <img
                src="/welcome/first.png"
                alt="first-page"
                className={styles.firstBack}
              />
              <img
                src="/welcome/check.svg"
                alt="first-page"
                className={styles.check}
              />
              <img
                src="/welcome/check.svg"
                alt="first-page"
                className={styles.secondCheck}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.secondImage}>
              <img
                src="/welcome/second-back.png"
                alt="second-page"
                className={styles.secondBack}
              />
              <img
                src="/welcome/second-top.png"
                alt="second-page"
                className={styles.secondTop}
              />
              <img
                src="/welcome/second-mid.png"
                alt="second-page"
                className={styles.secondMid}
              />
              <img
                src="/welcome/second-bottom.png"
                alt="second-page"
                className={styles.secondBottom}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.thirdImage}>
              <img
                src="/welcome/third.png"
                alt="third-page"
                className={styles.thirdBack}
              />
              <img
                src="/welcome/click.png"
                alt="click"
                className={styles.click}
              ></img>
              <img
                src="/welcome/cursor.png"
                alt="cursor"
                className={styles.cursor}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.swiperText}>
        <Swiper
          id="secondSwiper"
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          className={styles.second}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          modules={[Controller]}
        >
          <SwiperSlide>
            <p className={styles.onBoardingTitle}>
              쉽게 까먹는 진료 기록을 함께 기록해요!
            </p>
            <p className={styles.onBoardingContent}>
              치과 진료 내역을 기록하여 치아 상태를 관리하고 <br /> 다른
              사용자들의 진료 기록을 열람하며
              <br /> 치료 시세와 병원 정보를 알 수 있어요!
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className={styles.onBoardingTitle}>
              어려운 치아에 관해
              <br /> 사람들과 소통해요!
            </p>
            <p className={styles.onBoardingContent}>
              다른 사람들과 치료 종류, 치과 후기, 꿀팁 등에 <br />
              대해 자유롭게 글을 올리고
              <br /> 댓글로 소통할 수 있어요!
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className={styles.onBoardingTitle}>
              지금까지 받은 치료를 <br />
              한번에 볼 수 있어요!
            </p>
            <p className={styles.onBoardingContent}>
              치아를 선택하면 지금까지 받은 치료를
              <br /> 기록하고 열람할 수 있어요!
            </p>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.next}>
        <button
          type="button"
          className={styles.nextButton}
          onClick={handleMainButton}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
