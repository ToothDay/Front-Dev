"use client";
import { useEffect, useState } from "react";
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
  useModifyData,
  useTreatmentCost,
  useTreatmentType
} from "@/stores/medicalWrite";
import Modal from "../modal/Modal";
import {
  useMutation,
  UseMutationResult,
  useQuery
} from "@tanstack/react-query";
import {
  SaveMyDentistResponse,
  modifyMyDentist,
  saveMyDentist
} from "@/api/medicalRecord";
import { useRouter } from "next/navigation";
import Error from "../error/Error";
import Loading from "@/app/loading";
import { fetchMyMedicalDetail } from "@/api/medical";
import { useToothStore } from "@/stores/tooth";
import {
  validateDate,
  validateDentistId,
  validateSelectTooth,
  validateToothCost
} from "@/util/validation";

export type SaveParams = {
  dentistId: number;
  visitDate: string;
  treatmentList: TreatmentList[];
  isShared: boolean;
};

const MedicalWrite = () => {
  const [isShare, setIsShare] = useState<boolean>(true);
  const [isClinic, setIsClinic] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const { treatmentType, clearTreatmentType } = useTreatmentType();
  const [clickTreatment, setClickTreatment] = useState<boolean>(false);
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const {
    dentistId,
    visitDate,
    treatmentList,
    isShared,
    updateIsShared,
    updateDentistId,
    updateTreatmentList,
    updateVisitDate
  } = useMedicalWriteStore();
  const [isFill, setIsFill] = useState<boolean>(false);
  const { treatmentCostList } = useTreatmentCost();

  const [params, setParams] = useState<SaveParams>({
    dentistId: 0,
    visitDate: "",
    treatmentList: [],
    isShared: true
  });

  const [modifyId, setModifyId] = useState<number>(0);
  const { saveTooth } = useToothStore();

  const [hasCost, setHasCost] = useState<boolean>(false);
  const [noClinic, setNoClinic] = useState<boolean>(false);
  const [noDate, setNoDate] = useState<boolean>(false);
  const [noTooth, setNoTooth] = useState<boolean>(false);
  const [noCost, setNoCost] = useState<boolean>(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    clearTreatmentType();
    if (id) {
      setModifyId(Number(id));
      setClickTreatment(true);
      setIsDisplay(true);
    } else {
      setModifyId(0);
      setClickTreatment(false);
      setIsDisplay(false);
      setModifyData({});
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    treatmentType.filter((treatment) => treatment.isClick).length > 0
      ? setClickTreatment(true)
      : setClickTreatment(false);
  }, [treatmentType]);

  useEffect(() => {
    setParams({
      dentistId,
      visitDate,
      treatmentList,
      isShared
    });
    if (treatmentList.length > 0) {
      const noCost = treatmentList.some((treatment) => treatment.amount === 0);
      if (noCost) {
        setHasCost(false);
      } else {
        setHasCost(true);
      }
    }

    if (dentistId && visitDate && hasCost) {
      setIsFill(true);
    } else {
      setIsFill(false);
    }
  }, [dentistId, visitDate, treatmentList, isShared, saveTooth]);

  const mutation: UseMutationResult<SaveMyDentistResponse, Error, SaveParams> =
    useMutation({
      mutationFn: saveMyDentist,
      onSuccess: (data) => {
        router.push("/medical");
      },
      onError: (error) => {
        console.error("Failed to save my history", error);
      }
    });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchModifyData"],
    queryFn: () => fetchMyMedicalDetail(String(modifyId)),
    enabled: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  useEffect(() => {
    if (modifyId > 0) {
      refetch();
    }
  }, [modifyId]);

  const modifyMutation: UseMutationResult<
    SaveMyDentistResponse,
    Error,
    { visitId: string; params: SaveParams }
  > = useMutation({
    mutationFn: ({ visitId, params }) => modifyMyDentist(visitId, params),
    onSuccess: (data) => {
      router.push("/medical");
    },
    onError: (error) => {
      console.error("Failed to save my history", error);
    }
  });

  const { setModifyData } = useModifyData();

  useEffect(() => {
    if (data) {
      setModifyData(data);
      data.isShared && updateIsShared(data.isShared);
      updateDentistId(data.dentistId);
      updateTreatmentList(data.treatmentList);
      updateVisitDate(data.visitDate);
    }
  }, [data]);

  const validateForm = () => {
    const isDentistValid = validateDentistId(dentistId);
    const isDateValid = validateDate(visitDate);
    const selectedToothCount = treatmentCostList.filter(
      (treatment) => treatment.name !== "스케일링" && treatment.name !== "잇몸"
    ).length;
    const isToothValid = validateSelectTooth(saveTooth, selectedToothCount);
    const isToothCostValid = validateToothCost(treatmentList);

    setNoClinic(!isDentistValid);
    setNoDate(!isDateValid);
    setNoTooth(!isToothValid);
    setNoCost(!isToothCostValid);
    return isDentistValid && isDateValid && isToothValid && isToothCostValid;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      if (modifyId > 0) {
        modifyMutation.mutate({ visitId: String(modifyId), params });
      } else {
        mutation.mutate(params);
      }
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <form className={styles.writeForm}>
        <ClinicInput
          isClinic={isClinic}
          setIsClinic={setIsClinic}
          isModify={modifyId > 0}
          noClinic={noClinic}
          setNoClinic={setNoClinic}
        />
        <DateInput
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
          isModify={modifyId > 0}
          noDate={noDate}
          setNoDate={setNoDate}
        />
        <TreatmentSelection isModify={modifyId > 0} />
        <AnimatePresence>
          {(clickTreatment || modifyId) && (
            <>
              <CostInput
                isModify={modifyId > 0}
                noCost={noCost}
                setNoCost={setNoCost}
              />
              <ToothSelection
                isDisplay={isDisplay}
                isModify={modifyId > 0}
                setIsDisplay={setIsDisplay}
                noTooth={noTooth}
                setNoTooth={setNoTooth}
              />
              <ShareOption isShare={isShare} setIsShare={setIsShare} />
              <div onClick={handleClick}>
                <BtnBottom
                  btnType={isFill}
                  title={modifyId > 0 ? "수정 완료" : "기록 완료"}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </form>
      <Modal />
      {mutation.status === "success" && <Loading />}
      {mutation.status === "error" && <Error errorType="error" />}
    </>
  );
};

export default MedicalWrite;
