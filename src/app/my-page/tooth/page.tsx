"use client";
import Tooth from "@/components/tooth/Tooth";
import styles from "./page.module.scss";
import Header from "@/components/common/Header";
import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";
import { useToothStore } from "@/stores/tooth";
import { useQuery } from "@tanstack/react-query";
import { VisitsByToothId, fetchMyToothList } from "@/api/medicalRecord";
import { ToothType } from "../../../constants/toothConstants";
import Modal from "@/components/modal/Modal";
import { useModalStore } from "@/stores/modal";
import { TreatmentItem } from "@/api/medical";
import { useRouter } from "next/navigation";
import TreatmentMyModal from "@/components/modal/TreatmentMyModal";

const MyTooth = () => {
  const { userProfile } = useUserStore();
  const { setSaveTooth } = useToothStore();
  const [selectedTooth, setSelectedTooth] = useState<ToothType>({
    toothId: 0,
    name: "",
    number: 0,
    icon: ""
  });
  const { openModal } = useModalStore();
  const [selectedTreatmentDate, setSelectedTreatmentDate] = useState<string[]>(
    []
  );

  useEffect(() => {
    setSaveTooth([]);
  }, []);

  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem[][]>(
    []
  );
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<VisitsByToothId, Error>({
    queryKey: ["visitsByToothId"],
    queryFn: fetchMyToothList,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  useEffect(() => {
    if (data && selectedTooth.toothId !== 0) {
      const toothList = data[selectedTooth.toothId];
      const toothTreat = toothList?.map((treat) => treat.treatmentList);
      const treatmentDate = toothList?.map((treat) => treat.visitDate);
      const formatDate = treatmentDate?.map((date) => {
        return date.replace(/(\d{4})년 (\d{2})월 (\d{2})일/, "$1.$2.$3");
      });
      setSelectedTreatment(toothTreat || []);
      setSelectedTreatmentDate(formatDate || []);
    }
  }, [data, selectedTooth]);

  useEffect(() => {
    if (selectedTooth.toothId !== 0) {
      openModal(
        <TreatmentMyModal
          treatmentList={selectedTreatment}
          toothInfo={selectedTooth}
          type="all"
          selectedTreatmentDate={selectedTreatmentDate}
        />
      );
    }
  }, [selectedTreatment, selectedTooth]);

  const handleAddButton = () => {
    router.push("/medical/write");
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>
            {" "}
            {userProfile?.username || "회원"} 님의 현재 치아 상태
          </p>
          <p className={styles.infoText}>
            최근 변경 사항이 있다면 <br />
            치아를 눌러서 수정해 주세요
          </p>
        </div>
        <section className={styles.toothContainer}>
          <div className={styles.toothBox}>
            <span className={styles.boxTitle}>왼쪽 치아</span>
            <Tooth location="left" setSelectedTooth={setSelectedTooth} />
          </div>
          <div className={styles.toothBox}>
            <span className={styles.boxTitle}>오른쪽 치아</span>
            <Tooth location="right" setSelectedTooth={setSelectedTooth} />
          </div>
        </section>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddButton}
        >
          추가하기
        </button>
      </main>
      <Modal />
    </>
  );
};

export default MyTooth;
