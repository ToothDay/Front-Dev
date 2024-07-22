"use client";

import styles from "./DetailActionButton.module.scss";
import BtnBottom from "../common/BtnBottom";
import { useModalStore } from "@/stores/modal";
import DeleteModal from "../modal/DeleteModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import SimpleModal from "../modal/SimpleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMyData } from "@/api/medicalRecord";

type DetailActionButtonProps = {
  id: string;
};

const DetailActionButton = ({ id }: DetailActionButtonProps) => {
  const { openModal } = useModalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleModify = () => {
    setIsLoading(true);
    router.push(`/medical/write?id=${id}`);
    setIsLoading(false);
  };

  const mutation = useMutation({
    mutationFn: (id: string) => deleteMyData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitDetail"] });
    }
  });

  const handleConfirm = async (id: string) => {
    setIsLoading(true);
    try {
      await mutation.mutateAsync(id);
      openModal(<SimpleModal type="medicalY" answer="확인" />);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    openModal(
      <DeleteModal
        deleteType="record"
        commentY="네 삭제할게요"
        onConfirm={() => handleConfirm(id)}
      />
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      <section className={styles.buttonList}>
        <div className={styles.modifyButton} onClick={handleModify}>
          <BtnBottom title="수정하기" btnType={false} />
        </div>
        <div className={styles.deleteButton} onClick={handleDelete}>
          <BtnBottom title="삭제하기" btnType={false} />
        </div>
      </section>
    </>
  );
};

export default DetailActionButton;
