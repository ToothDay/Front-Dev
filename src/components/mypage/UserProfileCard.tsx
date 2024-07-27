"use client";
import Link from "next/link";
import styles from "./UserProfileCard.module.scss";
import { useUserStore } from "@/stores/user";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserProfileCard = () => {
  const { userProfile } = useUserStore();
  const { username, profileImageUrl } = userProfile;
  const defaultImage = "/profile.svg";
  const [profileImage, setProfileImage] = useState<string>(defaultImage);

  useEffect(() => {
    if (!profileImageUrl) {
      setProfileImage(defaultImage);
    } else {
      const isFullUrl =
        profileImageUrl.startsWith("http://") ||
        profileImageUrl.startsWith("https://");
      setProfileImage(
        isFullUrl
          ? profileImageUrl
          : `${process.env.IMAGE_PATH}${profileImageUrl}`
      );
    }
  }, [profileImageUrl]);

  return (
    <article className={styles.user}>
      <Image
        src={profileImage}
        alt="profile"
        width={83}
        height={83}
        className={styles.profileImg}
        loading="lazy"
        placeholder="blur"
        onError={(e) => {
          setProfileImage("/profile.svg");
        }}
        blurDataURL="/profile.svg"
      />
      <div className={styles.userDetail}>
        <span className={styles.userName}>{username || "회원님"}</span>
        <Link href="/my-page/edit">
          <button type="button" className={styles.profileButton}>
            프로필 편집
          </button>
        </Link>
      </div>
    </article>
  );
};

export default UserProfileCard;
