import styles from "@/app/my-page/edit/page.module.scss";
import BtnBottom from "@/components/common/BtnBottom";
import Header from "@/components/common/Header";

const ProfileEdit = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <section className={styles.profile}>
        <article className={styles.user}>
          <div className={styles.title}>프로필 사진</div>
          <div className={styles.imgDiv}>
            <img src="/profile.svg" alt="user-profile" />
            <div className={styles.imgBtnDiv}>
              <button className={styles.imgBtn}>사진 변경하기</button>
              <button className={styles.imgBtnDefault}>
                <span className={styles.imgText}>기본으로 설정하기</span>
              </button>
            </div>
          </div>
          <div className={styles.email}>
            <div className={styles.emailTitle}>이메일</div>
            <div className={styles.emailText}>user@gamil.com</div>
          </div>
          <div className={styles.nickName}>
            <div className={styles.nickNameTitle}>닉네임</div>
            <div className={styles.nickNameTextDiv}>
              <input className={styles.nickNameText} value={"현재 닉네임"} />
            </div>
            <hr className={styles.nickNameHr} />
            <span className={styles.failText}>
              닉네임은 최대 10자까지 가능합니다!
            </span>
          </div>
          {/* <BtnBottom btnType="myPage" /> */}
          <BtnBottom btnType="canSave" />
        </article>
      </section>
    </main>
  );
};

export default ProfileEdit;
