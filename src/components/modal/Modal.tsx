"use client";

import styles from "./Modal.module.scss";
import { useModalStore } from "@/stores/modal";

type PropsModal = {
  children: React.ReactNode;
};

const Modal = ({ children }: PropsModal) => {
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
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
