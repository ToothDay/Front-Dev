import TreatmentSwiper from "@/components/common/TreatmentSwiper";
import styles from "./page.module.scss";
import Tab from "@/components/common/Tab";
import PostCard from "@/components/common/PostCard";

const Community = () => {
  const hasNotice = false; //임시데이터값

  return (
    <main className={styles.main}>
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
      <PostCard type="community" />
      <PostCard type="community" />
      <PostCard type="community" />
      <PostCard type="community" />
      <PostCard type="community" />
    </main>
  );
};

export default Community;
