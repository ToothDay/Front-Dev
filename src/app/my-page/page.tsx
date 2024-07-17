import styles from "@/app/my-page/page.module.scss";
import Tab from "@/components/common/Tab";
import Service from "@/components/mypage/Service";
import Link from "next/link";
import UserProfileCard from "@/components/mypage/UserProfileCard";

type CommunityList = {
  title: string;
  icon: string;
  link: string;
};

const COMMUNITY_LIST: CommunityList[] = [
  { title: "내가 작성한 글", icon: "post", link: "/my-activity/post" },
  { title: "내가 좋아요 누른 글", icon: "like", link: "/my-activity/like" },
  { title: "내가 댓글 단 글", icon: "comment", link: "/my-activity/comment" }
];

const MyPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.profile}>
        <div className={styles.tab}>
          <Tab pageType="myPage" initialActiveTab="MY" />
        </div>
        <UserProfileCard />
        <article className={styles.info}>
          <Link href="/my-page/history">
            <div className={styles.infoBox}>
              <span className={styles.infoTitle}>진료기록</span>
              <img
                className={styles.myIcon}
                src="/record-icon.png"
                alt="record-icon"
              />
            </div>
          </Link>
          <Link href="/my-page/tooth">
            <div className={styles.infoBox}>
              <span className={styles.infoTitle}>나의 치아</span>
              <img
                className={styles.myIcon}
                src="/tooth-icon.png"
                alt="my-tooth"
              />
            </div>
          </Link>
        </article>
      </section>
      <section className={styles.community}>
        <h2 className={styles.communityTitle}>커뮤니티</h2>
        {COMMUNITY_LIST.map((list: CommunityList) => (
          <Link href={list.link} key={list.icon}>
            <article className={styles.communityList}>
              <p className={[styles.listTitle, styles[list.icon]].join(" ")}>
                {list.title}
              </p>
              <button type="button" className={styles.moreButton}>
                더보기
              </button>
            </article>
          </Link>
        ))}
      </section>
      <section className={styles.serviceUse}>
        <Service />
      </section>
    </main>
  );
};

export default MyPage;
