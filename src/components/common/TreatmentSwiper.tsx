"use client";
import styles from "@/components/common/TreatmentSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { TREATMENT_LIST, Treatment } from "@/constants/treatmentConstants";
import "swiper/css";
import { useEffect, useState } from "react";

type PropsTreatment = {
  listType?: "all";
  showSelected: (keyword: number) => void;
};

const TreatmentSwiper = ({ listType, showSelected }: PropsTreatment) => {
  const [selected, setSelected] = useState<number>(0);

  const treatmentItem: Treatment[] =
    listType === "all"
      ? [{ id: 0, keywordId: 1, name: "전체" }, ...TREATMENT_LIST]
      : TREATMENT_LIST;

  useEffect(() => {
    setSelected(treatmentItem[0].keywordId);
  }, [listType]);
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={6}
      freeMode={true}
      grabCursor={true}
      className={styles.treatmentSwiper}
    >
      {treatmentItem.map((treatment) => (
        <SwiperSlide
          key={treatment.id}
          className={[
            styles.treatmentItem,
            treatment.keywordId === selected ? styles.selected : ""
          ].join(" ")}
          onClick={() => {
            setSelected(treatment.keywordId);
            showSelected(treatment.keywordId);
            console.log(treatment.keywordId);
          }}
        >
          {treatment.name}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TreatmentSwiper;
