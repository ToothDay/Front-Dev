import styles from "@/components/modal/SimpleModal.module.scss";
import { useModalStore } from "@/stores/modal";

type PropsModal = {
  type: string;
  answer?: string;
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
  }
};

const SimpleModal = ({ type, answer }: PropsModal) => {
  const { closeModal } = useModalStore();

  return (
    <div className={styles.main}>
      <p className={styles.mainTitle}>{MODAL_TYPE[type].title}</p>
      <button type="button" className={styles.mainBtn} onClick={closeModal}>
        {answer}
      </button>
    </div>
  );
};

export default SimpleModal;
