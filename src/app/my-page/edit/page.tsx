import styles from "@/app/my-page/edit/page.module.scss";
import Header from "@/components/common/Header";

const ProfileEdit = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <section className={styles.profile}>
        <article>
          <div className={styles.title}>프로필 사진</div>
          <div className={styles.imgDiv}>
            <img src="/profile.svg" alt="user-profile" />
            <div className={styles.imgBtnDiv}>
              <button className={styles.imgBtn}>사진 변경하기</button>
              <button className={styles.imgBtnDefault}>
                {/* <span>기본으로</span>
                <span>설정하기</span> */}
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
              <img src="/pencil.svg" alt="nickname-updateBtn" />
            </div>
            <hr className={styles.nickNameHr} />
          </div>
          <div className={styles.saveBtnDiv}>
            <button className={styles.saveBtn}>저장하기</button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ProfileEdit;
