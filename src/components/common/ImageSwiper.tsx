"use client";
import styles from "@/components/common/imageSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";

type PropsImage = {
  listType?: "all";
  imageList?: { id?: number; src: string }[];
  type: "read" | "write" | "update";
};

const ImageSwiper = ({ listType, imageList, type }: PropsImage) => {
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageList);
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
                : `${process.env.IMAGE_PATH}/${image.src}`
            }
            onError={(e) => {
              e.currentTarget.src = "/default-postin.png";
              console.error("Image fetch error:", e);
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
