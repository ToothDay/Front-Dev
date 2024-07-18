"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import styles from "./MedicalWrite.module.scss";
import BtnBottom from "../common/BtnBottom";
import ClinicInput from "@/components/medical/ClinicInput";
import DateInput from "@/components/medical/DateInput";
import TreatmentSelection from "./TreatmentSelection";
import CostInput from "./CostInput";
import ToothSelection from "./ToothSelection";
import ShareOption from "./ShareOption";
import {
  TreatmentList,
  useMedicalWriteStore,
  useTreatmentType
} from "@/stores/medicalWrite";
import Modal from "../modal/Modal";
import { useMutation } from "react-query";
import { saveMyDentist } from "@/api/medicalRecord";
import { useRouter } from "next/navigation";
import Error from "../error/Error";

export type SaveParams = {
  dentistId: number;
  visitDate: string;
  treatmentlist: TreatmentList[];
  isShared: boolean;
};

const MedicalWrite = () => {
  const [isShare, setIsShare] = useState<boolean>(true);
  const [isClinic, setIsClinic] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const { treatmentType } = useTreatmentType();
  const [clickTreatment, setClickTreatment] = useState<boolean>(false);
  const { dentistId, visitDate, treatmentlist, isShared } =
    useMedicalWriteStore();

  const [isFill, setIsFill] = useState<boolean>(false);

  const [params, setParams] = useState<SaveParams>({
    dentistId: 0,
    visitDate: "",
    treatmentlist: [],
    isShared: true
  });

  const router = useRouter();

  useEffect(() => {
    treatmentType.filter((treatment) => {
      return treatment.isClick;
    }).length > 0
      ? setClickTreatment(true)
      : setClickTreatment(false);
  }, [treatmentType]);

  useEffect(() => {
    setParams({
      dentistId,
      visitDate,
      treatmentlist,
      isShared
    });
    if (dentistId && visitDate && treatmentlist.length > 0) {
      setIsFill(true);
    }
  }, [dentistId, visitDate, treatmentlist, isShared]);

  const mutation = useMutation({
    mutationFn: () => saveMyDentist(params),
    onSuccess: (data) => {
      router.push("/medical");
    },
    onError: (error) => {
      console.error("Failed to save my history", error);
    }
  });

  const handleClick = () => {
    if (isFill) {
      mutation.mutate();
    }
  };

  return (
    <>
      <form className={styles.writeForm}>
        <ClinicInput isClinic={isClinic} setIsClinic={setIsClinic} />
        <DateInput isCalendar={isCalendar} setIsCalendar={setIsCalendar} />
        <TreatmentSelection />
        <AnimatePresence>
          {clickTreatment && (
            <>
              <CostInput />
              <ToothSelection />
              <ShareOption isShare={isShare} setIsShare={setIsShare} />
              <div onClick={handleClick}>
                <BtnBottom btnType={isFill} title="기록 완료" />
              </div>
            </>
          )}
        </AnimatePresence>
      </form>
      <Modal />
      {mutation.error && <Error errorType="error" />}
    </>
  );
};

export default MedicalWrite;
