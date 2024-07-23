"use client";
import styles from "@/components/common/imageSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type PropsImage = {
  listType?: "all";
  imageList?: { id?: number; src: string }[];
  type: "read" | "write";
};

const ImageSwiper = ({ listType, imageList, type }: PropsImage) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={6}
      freeMode={true}
      grabCursor={true}
      className={styles.imageSwiper}
    >
      {imageList?.map((image) => (
        <SwiperSlide key={image.src} className={[styles.imageItem].join(" ")}>
          <img
            className={
              type === "write" ? styles["image-write"] : styles["image-read"]
            }
            src={
              type === "write"
                ? image.src
                : `http://3.34.135.181:8000/upload/${image.src}`
            }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
