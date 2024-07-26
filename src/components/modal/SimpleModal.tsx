"use client";
import styles from "@/components/modal/SimpleModal.module.scss";
import { useModalStore } from "@/stores/modal";
import { useRouter } from "next/navigation";

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
      router.push(`/community/post/${to}`);
    }
  };

  return (
    <div className={styles.main}>
      <p className={styles.mainTitle}>{MODAL_TYPE[type].title}</p>
      <button type="button" className={styles.mainBtn} onClick={handleClick}>
        {answer}
      </button>
    </div>
  );
};

export default SimpleModal;
