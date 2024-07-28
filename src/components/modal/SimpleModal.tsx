"use client";
import styles from "@/components/modal/SimpleModal.module.scss";
import { useModalStore } from "@/stores/modal";
import { useRouter } from "next/navigation";
import Community from "../../app/community/page";

type PropsModal = {
  type: string;
  answer?: string;
  to?: number;
};

type modalType = {
  [deleteType: string]: {
    title: string | JSX.Element;
    content?: string | JSX.Element;
  };
};

const MODAL_TYPE: modalType = {
  writeY: {
    title: "작성 완료되었습니다."
  },
  medicalY: {
    title: (
      <>
        진료기록이 <br /> 삭제되었습니다.
      </>
    )
  },
  deleteN: {
    title: (
      <>
        회원탈퇴를 <br /> 실패하였습니다. <br /> 다시 시도해주세요.
      </>
    )
  },
  delPostY: {
    title: (
      <>
        게시물이 <br /> 삭제되었습니다.
      </>
    )
  },
  profileY: {
    title: (
      <>
        프로필 수정이 <br /> 완료되었습니다.
      </>
    )
  },
  email: {
    title: (
      <>
        <p className={styles.emailTitle}>
          서비스에 대한 문의는 <br /> 아래 이메일에 남겨주세요.
        </p>
        <div className={styles.email}>
          <div className={styles.emailBox}>
            <p className={styles.emailName}>기획자</p>
            <p className={styles.emailText}>ichaen0828@gmail.com </p>
          </div>
          <div className={styles.emailBox}>
            <p className={styles.emailName}>디자이너 </p>
            <p className={styles.emailText}>jooendj@khu.ac.kr</p>
          </div>
          <div className={styles.emailBox}>
            <p className={styles.emailName}>FE개발자</p>
            <p className={styles.emailText}>moonsun116@naver.com</p>
            <p className={styles.emailText}>wjdtj9656@gmail.com</p>
          </div>
          <div className={styles.emailBox}>
            <p className={styles.emailName}>BE개발자</p>
            <p className={styles.emailText}>3759357won@gmail.com</p>
            <p className={styles.emailText}>lin1041840@gmail.com</p>
            <p className={styles.emailText}>sshinjaeeunn@gmail.com</p>
          </div>
        </div>
      </>
    )
  }
};

const SimpleModal = ({ type, answer, to }: PropsModal) => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const handleClick = () => {
    closeModal();
    if (type === "medicalY") {
      router.push("/medical");
    } else if (type === "delPostY") {
      router.push("/community");
    } else if (type === "writeY") {
      router.replace(`/community/post/${to}`);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.mainTitle}>{MODAL_TYPE[type].title}</div>
      <button type="button" className={styles.mainBtn} onClick={handleClick}>
        {answer}
      </button>
    </div>
  );
};

export default SimpleModal;
