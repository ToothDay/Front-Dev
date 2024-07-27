"use client";
import BtnBottom from "@/components/common/BtnBottom";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import ImageSwiper from "@/components/common/ImageSwiper";
import { TREATMENT_LIST } from "@/constants/treatmentConstants";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useModalStore } from "@/stores/modal";
import Modal from "@/components/modal/Modal";
import DeleteModal from "@/components/modal/DeleteModal";
import SimpleModal from "@/components/modal/SimpleModal";
import { useMutation } from "@tanstack/react-query";
import { PostCommunity, updatePost } from "@/api/communityApi";
import { useRouter, useSearchParams } from "next/navigation";

const CommunityWritePage = () => {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "update" | "read">("write");
  const [imageList, setImageList] = useState<
    { id: number; src: string; file: File }[]
  >([]);
  const { openModal } = useModalStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const title = searchParams.get("title");
    const content = searchParams.get("content");
    const imageUrl = searchParams.get("imageUrl");
    const keywords = searchParams.get("keywords");
    if (searchParams.size > 0) {
      setMode("update");
    }
    if (title) setTitle(title);
    if (content) setMainText(content);
    if (imageUrl) {
      setImageList(
        JSON.parse(imageUrl).map((src: string, index: number) => ({
          id: index,
          src,
          file: null
        }))
      );
    }
    if (keywords) setSelected(JSON.parse(keywords));
  }, [searchParams]);
  //const debouncedSetTitle = debounce((value: string) => setTitle(value), 300);

  // const debouncedSetMainText = debounce(
  //   (value: string) => setMainText(value),
  //   300
  // );
  const handleTitleChange = (e: { target: { value: string } }) => {
    setTitle(e.target.value);
    //debouncedSetTitle(e.target.value);
  };
  const handleMainTextChange = (e: { target: { value: string } }) => {
    setMainText(e.target.value);
    //debouncedSetMainText(e.target.value);
  };
  const handleKeywordClick = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file, index) => ({
        id: imageList.length + index,
        src: URL.createObjectURL(file),
        file: file
      }));
      setImageList((prevList) => [...prevList, ...newImages]);
    }
  };

  const mutation = useMutation({
    mutationFn: PostCommunity,
    onSuccess: (res) => {
      openModal(
        <SimpleModal type={"writeY"} answer={"보러가기"} to={res.postId} />
      );
    },
    onError: (error) => {
      console.log(error);
      openModal(
        <DeleteModal
          deleteType={"write"}
          commentY={"다시 시도하기"}
          commentN={"뒤로가기"}
        />
      );
    }
  });
  const mutationUpdate = useMutation({
    mutationFn: updatePost,
    onSuccess: (res) => {
      openModal(
        <SimpleModal type={"writeY"} answer={"보러가기"} to={res.postId} />
      );
    },
    onError: (error) => {
      console.error(error);
      openModal(
        <DeleteModal
          deleteType={"write"}
          commentY={"다시 시도하기"}
          commentN={"뒤로가기"}
        />
      );
    }
  });
  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (title.length > 0 && mainText.length > 0) {
      const formData = new FormData();
      const postForm = {
        title,
        content: mainText,
        keywords: selected
      };

      formData.append(
        "postForm",
        new Blob([JSON.stringify(postForm)], { type: "application/json" })
      );
      imageList.forEach((image) => {
        if (image.file) {
          formData.append("files", image.file);
        }
      });

      try {
        if (mode === "write") {
          mutation.mutate(formData);
        } else if (mode === "update") {
          mutationUpdate.mutate({
            formData,
            postId: searchParams.get("postId")
          });
        }
      } catch (error) {
        console.error("FormData error:", error);
      }
    }
  };

  const handleCancelPost = () => {
    router.push("/community");
  };
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header
          title={mode == "update" ? "게시글 수정하기" : "게시글 작성하기"}
          openModal={() =>
            openModal(
              <DeleteModal
                deleteType={"write"}
                commentY={"네 취소할게요"}
                onConfirm={handleCancelPost}
              />
            )
          }
        />
      </div>
      <section>
        <article className={styles.titleDiv}>
          <div className={styles.title}>제목</div>
          <input
            className={styles.titleMain}
            maxLength={70}
            placeholder={"최대 70자 이내로 제목을 적어주세요."}
            onChange={handleTitleChange}
            value={title}
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
            value={mainText}
          ></textarea>
          <ImageSwiper listType="all" imageList={imageList} type={mode} />
          <div
            className={styles.imageDiv}
            onClick={() => fileInputRef?.current?.click()}
          >
            <button className={styles.image} />
            <input
              type="file"
              multiple
              className={styles.fileInput}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
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
                  selected.indexOf(treatment.keywordId) >= 0
                    ? styles.selected
                    : ""
                ].join(" ")}
                key={treatment.id}
                onClick={() => {
                  handleKeywordClick(treatment.keywordId);
                }}
              >
                {`# ${treatment.name}`}
              </span>
            ))}
          </div>
        </article>
        <div
          className={styles.endBtnDiv}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (title.length > 0 && mainText.length > 0) {
              handleSubmit(e);
            } else {
              return;
            }
          }}
        >
          <BtnBottom
            btnType={title.length > 0 && mainText.length > 0 ? true : false}
            title={mode == "update" ? "수정 완료" : "작성 완료"}
          />
        </div>
      </section>
      <Modal />
    </main>
  );
};
export default CommunityWritePage;
