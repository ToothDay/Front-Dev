"use client";
import BtnBottom from "@/components/common/BtnBottom";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import ImageSwiper from "@/components/common/ImageSwiper";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

const CommunityWritePage = () => {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const debouncedSetTitle = useCallback(
    debounce((value: string) => setTitle(value), 300),
    []
  );

  const debouncedSetMainText = useCallback(
    debounce((value: string) => setMainText(value), 300),
    []
  );

  const handleTitleChange = (e: { target: { value: string } }) => {
    debouncedSetTitle(e.target.value);
  };
  const handleMainTextChange = (e: { target: { value: string } }) => {
    debouncedSetMainText(e.target.value);
  };
  const handleKeywordClick = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const imageList = [
    { id: 1, src: "/profile.svg" },
    { id: 2, src: "/profile.svg" },
    { id: 3, src: "/profile.svg" },
    { id: 4, src: "/profile.svg" },
    { id: 5, src: "/image-add.svg" }
  ];
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header title="게시글 작성하기" />
      </div>
      <section>
        <article className={styles.titleDiv}>
          <div className={styles.title}>제목</div>
          <input
            className={styles.titleMain}
            maxLength={70}
            placeholder={"최대 70자 이내로 제목을 적어주세요."}
            onChange={handleTitleChange}
          />
        </article>
        <article className={styles.textDiv}>
          <div className={styles.title}>본문 내용</div>
          <textarea
            className={styles.textMain}
            placeholder={
              "치아, 치과, 구강 건강 등 다양한 내용을 자유롭게 작성해주세요."
            }
            onChange={handleMainTextChange}
          ></textarea>
          <ImageSwiper listType="all" imageList={imageList} />
          <div className={styles.imageDiv}>
            <button className={styles.image} />
            <div className={styles.imageNumber}>{`${imageList.length}/10`}</div>
          </div>
        </article>
        <article className={styles.keywordDiv}>
          <div className={styles.title}>키워드</div>
          <div className={styles.keywordMain}>
            {TREATMENT_LIST.map((treatment) => (
              <span
                className={[
                  styles.keyword,
                  selected.indexOf(treatment.id) >= 0 ? styles.selected : ""
                ].join(" ")}
                key={treatment.id}
                onClick={() => {
                  handleKeywordClick(treatment.id);
                }}
              >
                {`# ${treatment.name}`}
              </span>
            ))}
          </div>
        </article>
        <div className={styles.endBtnDiv}>
          <BtnBottom
            btnType={title.length > 0 && mainText.length > 0 ? true : false}
            title="작성 완료"
          />
        </div>
      </section>
    </main>
  );
};
export default CommunityWritePage;
