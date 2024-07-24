"use client";
import styles from "@/app/my-page/edit/page.module.scss";
import BtnBottom from "@/components/common/BtnBottom";
import Header from "@/components/common/Header";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";
import { putProfile } from "@/api/profileApi";
import SimpleModal from "@/components/modal/SimpleModal";
import { useModalStore } from "@/stores/modal";

const ProfileEdit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | string>();
  const { userProfile, setUserProfile } = useUserStore();
  const [nickname, setNickname] = useState(userProfile.username);
  const { openModal } = useModalStore();

  useEffect(() => {
    setNickname(userProfile.username);
  }, [userProfile.username]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserProfile({
        id: userProfile.id,
        email: userProfile.email,
        profileImageUrl: URL.createObjectURL(e.target.files[0]),
        username: userProfile.username
      });
      setFile(e.target.files[0]);
    }
  };
  const handleDefaultImage = () => {
    setUserProfile({
      id: userProfile.id,
      email: userProfile.email,
      profileImageUrl: "/profile.svg",
      username: nickname
    });
    setFile("");
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (nickname.length > 0 && nickname.length <= 10) {
      const formData = new FormData();
      const postForm = {
        username: nickname
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
    onSuccess: () => {
      setUserProfile({
        id: userProfile.id,
        email: userProfile.email,
        profileImageUrl: userProfile.profileImageUrl,
        username: nickname
      });
      //모달 안뜨는 문제 有 => 뒤로가기 누르면 뜨는현상
      // openModal(<SimpleModal type="profileY" answer="확인" />);
      alert("저장완료");
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
            <img
              src={`${userProfile.profileImageUrl}`}
              alt="user-profile"
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
    </main>
  );
};

export default ProfileEdit;
