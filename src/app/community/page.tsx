"use client";
import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import PostCard from "@/components/common/PostCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getLoginedCommunityList } from "@/api/communityApi";
import Loading from "../loading";

type PostDataType = {
  postId: number;
  createDate: Date;
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
  likedByCurrentUser: boolean;
  writtenByCurrentUser: boolean;
  imageUrl: string[];
  commentDTOList: [];
  keyword: number[];
  user: {
    email: string;
    id: number;
    profileImageUrl: string;
    username: string;
  };
};

const Community = () => {
  const hasNotice = false; //임시데이터값
  const { data, isLoading, error } = useQuery({
    queryKey: ["getCommunity"],
    queryFn: () => getLoginedCommunityList()
  });
  return (
    <main className={styles.main}>
      {isLoading && <Loading useBg={false} />}
      <div className={styles.tab}>
        <Tab pageType="page" initialActiveTab="커뮤니티" />
        <button
          type="button"
          className={hasNotice ? styles.newNotice : styles.notice}
        >
          알림
        </button>
      </div>
      <div className={styles.searchWrapper}>
        <img
          src="/search-icon.svg"
          alt="search"
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.search}
          placeholder="검색어를 입력해 주세요."
        />
        {/* 삭제버튼 기능 추후 구현 */}
        <button type="button" className={styles.deleteButton}>
          삭제
        </button>
      </div>
      <div className={styles.treatmentWrapper}>
        <TreatmentSwiper listType="all" />
      </div>
      {/* 데이터 맵핑 예정 */}
      {data?.map((v: PostDataType) => (
        <Link key={v.postId} href={`/community/post/${v.postId}`}>
          <PostCard type="community" data={v} />
        </Link>
      ))}

      {/* 검색종류 따라  */}
      {/* <NoSearchData searchType="post" /> */}
      {/* <NoSearchData searchType="word" /> */}
      <Link href={"/community/write"}>
        <div className={styles.writeBtnDiv}>
          <button className={styles.writeBtn} />
        </div>
      </Link>
    </main>
  );
};

export default Community;
