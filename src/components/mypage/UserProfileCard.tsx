"use client";
import Link from "next/link";
import styles from "./UserProfileCard.module.scss";
import { useUserStore } from "@/stores/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile } from "@/api/profileApi";
import { useQuery } from "@tanstack/react-query";

const UserProfileCard = () => {
  const { userProfile } = useUserStore();
  const { username, profileImageUrl } = userProfile;
  const [profileImage, setProfileImage] = useState<string>(profileImageUrl);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
    staleTime: 0
  });
  
  useEffect(() => {
    setProfileImage(`http://3.34.135.181:8000/upload${data?.profileImageUrl}`);
  }, [data]);

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
