"use client";
import styles from "@/components/common/imageSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { TREATMENT_LIST, Treatment } from "@/constants/treatmentConstants";
import "swiper/css";
import { useEffect, useState } from "react";

type PropsImage = {
  listType?: "all";
  imageList?: { id: number; src: string }[];
};

const ImageSwiper = ({ listType, imageList }: PropsImage) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={6}
      freeMode={true}
      grabCursor={true}
      className={styles.imageSwiper}
    >
      {imageList?.map((image) => (
        <SwiperSlide key={image.id} className={[styles.imageItem].join(" ")}>
          <img className={styles.image} src={image.src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
