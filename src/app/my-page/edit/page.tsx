"use client";
import styles from "@/app/my-page/edit/page.module.scss";
import BtnBottom from "@/components/common/BtnBottom";
import Header from "@/components/common/Header";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/stores/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, putProfile } from "@/api/profileApi";
import SimpleModal from "@/components/modal/SimpleModal";
import { useModalStore } from "@/stores/modal";
import Image from "next/image";
import Modal from "@/components/modal/Modal";

const ProfileEdit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | string>();
  const { userProfile, setUserProfile } = useUserStore();
  const { profileImageUrl } = userProfile;
  const [nickname, setNickname] = useState(userProfile.username);
  const defaultProfile = "/profile.svg";
  const [imageUrl, setImageUrl] = useState<string>(defaultProfile);
  const [defaultImage, setDefaultImage] = useState(false);
  const { openModal } = useModalStore();

  useEffect(() => {
    setNickname(userProfile.username);
  }, [userProfile]);

  useEffect(() => {
    if (!profileImageUrl) {
      setImageUrl(defaultProfile);
    } else {
      const isFullUrl =
        profileImageUrl.startsWith("http://") ||
        profileImageUrl.startsWith("https://");
      setImageUrl(
        isFullUrl
          ? profileImageUrl
          : `${process.env.IMAGE_PATH}${profileImageUrl}`
      );
    }
  }, [profileImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setDefaultImage(false);
    }
  };
  const handleDefaultImage = () => {
    setImageUrl(defaultProfile);
    setDefaultImage(true);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (nickname.length > 0 && nickname.length <= 10) {
      const formData = new FormData();
      const postForm = {
        username: nickname,
        defaultY: defaultImage
      };
      formData.append(
        "request",
        new Blob([JSON.stringify(postForm)], { type: "application/json" })
      );
      if (file) {
        formData.append("profileImage", file);
      }
      try {
        mutation.mutate(formData);
      } catch (error) {
        console.error("FormData error:", error);
      }
    }
  };
  const mutation = useMutation({
    mutationFn: putProfile,
    onSuccess: (res) => {
      setUserProfile({
        id: userProfile.id,
        email: userProfile.email,
        profileImageUrl: res.profileImageUrl,
        username: nickname
      });
      openModal(<SimpleModal type="profileY" answer="확인" />);
    },
    onError: (error) => {
      console.log(error);
    }
  });
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <section className={styles.profile}>
        <article className={styles.user}>
          <div className={styles.title}>프로필 사진</div>
          <div className={styles.imgDiv}>
            <Image
              src={imageUrl}
              alt="user-profile"
              width={83}
              height={83}
              onError={(e) => {
                setImageUrl("/profile.svg");
              }}
              className={styles.profileImage}
            />
            <div className={styles.imgBtnDiv}>
              <button
                className={styles.imgBtn}
                onClick={() => fileInputRef?.current?.click()}
              >
                사진 변경하기
              </button>
              <input
                type="file"
                className={styles.fileInput}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button className={styles.imgBtnDefault}>
                <span className={styles.imgText} onClick={handleDefaultImage}>
                  기본으로 설정하기
                </span>
              </button>
            </div>
          </div>
          <div className={styles.email}>
            <div className={styles.emailTitle}>이메일</div>
            <div className={styles.emailText}>{userProfile.email}</div>
          </div>
          <div className={styles.nickName}>
            <div className={styles.nickNameTitle}>닉네임</div>
            <div className={styles.nickNameTextDiv}>
              <input
                className={styles.nickNameText}
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            <hr className={styles.nickNameHr} />
            {nickname.length > 10 && (
              <span className={styles.failText}>
                닉네임은 최대 10자까지 가능합니다!
              </span>
            )}
          </div>
        </article>
        <div onClick={handleSubmit}>
          <BtnBottom
            btnType={
              nickname.length != 0 && nickname.length <= 10 ? true : false
            }
            title="저장하기"
          />
        </div>
      </section>
      <Modal />
    </main>
  );
};

export default ProfileEdit;
