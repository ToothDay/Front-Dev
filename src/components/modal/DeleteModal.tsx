import styles from "@/components/modal/DeleteModal.module.scss";
import { useModalStore } from "@/stores/modal";

type PropsDeleteModal = {
  deleteType: string;
  commentY?: string;
  commentN?: string;
  onConfirm?: () => void;
};

type DeleteType = {
  [deleteType: string]: {
    title: string | JSX.Element;
    content: string | JSX.Element;
  };
};

const DELETE_TYPE: DeleteType = {
  post: {
    title: "게시글을 삭제하시겠습니까?",
    content: (
      <>
        게시글을 삭제하면 <br />
        다시 불러올 수 없습니다.
      </>
    )
  },
  record: {
    title: (
      <>
        진료 기록을 <br /> 삭제 하시겠습니까?
      </>
    ),
    content: (
      <>
        진료 기록을 삭제하면 <br />
        다시 불러올 수 없습니다.
      </>
    )
  },
  write: {
    title: "작성을 취소하시겠습니까?",
    content: (
      <>
        작성을 취소하면 <br />
        다시 불러올 수 없습니다.
      </>
    )
  }
};

const DeleteModal = ({
  deleteType,
  commentY,
  commentN,
  onConfirm
}: PropsDeleteModal) => {
  const { closeModal } = useModalStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className={styles.delete}>
      <p className={styles.deleteTitle}>{DELETE_TYPE[deleteType].title}</p>
      <p className={styles.deleteContent}>{DELETE_TYPE[deleteType].content}</p>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleConfirm}
      >
        {commentY ? commentY : "네 삭제할게요"}
      </button>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={closeModal}
      >
        {commentN ? commentN : "아니요"}
      </button>
    </div>
  );
};

export default DeleteModal;
