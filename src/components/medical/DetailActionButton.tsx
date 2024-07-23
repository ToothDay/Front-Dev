"use client";

import styles from "./DetailActionButton.module.scss";
import BtnBottom from "../common/BtnBottom";
import { useModalStore } from "@/stores/modal";
import DeleteModal from "../modal/DeleteModal";

type DetailActionButtonProps = {
  id: string;
};

const DetailActionButton = ({ id }: DetailActionButtonProps) => {
  const { openModal } = useModalStore();

  const handleModify = () => {
    console.log("수정하기");
  };

  const handleDelete = () => {
    console.log("삭제하기");
    openModal(<DeleteModal deleteType="record" commentY="네 삭제할게요" />);
  };

  return (
    <section className={styles.buttonList}>
      <div className={styles.modifyButton} onClick={handleModify}>
        <BtnBottom title="수정하기" btnType={false} />
      </div>
      <div className={styles.deleteButton} onClick={handleDelete}>
        <BtnBottom title="삭제하기" btnType={false} />
      </div>
    </section>
  );
};

export default DetailActionButton;
