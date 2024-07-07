"use client";

import styles from "@/components/common/Modal.module.scss";
import { useModalStore } from "@/stores/modal";
import DeleteModal from "../modal/DeleteModal";

const Modal = () => {
  const { closeModal, isOpen } = useModalStore();

  const handleModal = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={[styles.wrapper, isOpen ? styles.open : ""].join(" ")}
      onClick={handleModal}
    >
      {isOpen && (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <DeleteModal deleteType="write" />
        </div>
      )}
    </div>
  );
};

export default Modal;
