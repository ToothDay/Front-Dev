"use client";
import Header from "@/components/common/Header";
import styles from "./page.module.scss";

import {
  VisitDetail,
  VisitMyDetail,
  fetchMyMedicalDetail,
  fetchOtherMedicalDetail
} from "@/api/medical";
import DetailActionButton from "@/components/medical/DetailActionButton";
import Modal from "@/components/modal/Modal";
import DetailTooth from "@/components/tooth/DetailTooth";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { useToothStore } from "@/stores/tooth";
import { useEffect } from "react";
import {
  useMedicalWriteStore,
  useModifyData,
  useTreatmentCost,
  useTreatmentType
} from "@/stores/medicalWrite";
import { update } from "lodash";

type CategoryList = {
  category: string;
  count: number;
};

const MedicalDetail = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const type = searchParams.get("type");
  const { setSaveTooth } = useToothStore();
  const {
    updateIsShared,
    updateDentistId,
    updateTreatmentList,
    updateVisitDate
  } = useMedicalWriteStore();
  const { setModifyData } = useModifyData();
  const { treatmentCostList, updateTreatmentCost } = useTreatmentCost();
  const { treatmentType, updateOrAddTreatmentType, clearTreatmentType } =
    useTreatmentType();

  if (!id || !type) {
    return <div>Error: Invalid parameters</div>;
  }
  const queryFn =
    type === "me"
      ? () => fetchMyMedicalDetail(id)
      : () => fetchOtherMedicalDetail(id);

  const queryOptions: UseQueryOptions<VisitMyDetail | VisitDetail, Error> = {
    queryKey: ["visitDetail", id],
    queryFn,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
    enabled: !!id
  };

  const { data, error, isLoading } = useQuery<
    VisitMyDetail | VisitDetail,
    Error
  >(queryOptions);

  useEffect(() => {
    updateDentistId(0);
    updateTreatmentList([]);
    updateVisitDate("");
    updateIsShared(true);
    clearTreatmentType();
  }, []);

  useEffect(() => {
    const TreatmentTooth =
      data &&
      data.treatmentList
        .map((item) => item.toothId)
        .filter((toothId): toothId is number => toothId !== null);
    if (TreatmentTooth) setSaveTooth(TreatmentTooth);
    if (data) {
      setModifyData(data);
      data.isShared && updateIsShared(data.isShared);
      updateDentistId(data.dentistId);
      updateTreatmentList(data.treatmentList);
      updateVisitDate(data.visitDate);
    }
  }, [data]);

  const categoryList: CategoryList[] | undefined =
    data &&
    data.treatmentList.reduce<CategoryList[]>((acc, item) => {
      const index = acc.findIndex(
        (category) => category.category === item.category
      );
      if (index === -1) {
        acc.push({ category: item.category, count: 1 });
      } else {
        acc[index].count += 1;
      }
      return acc;
    }, []);

  return (
    <>
      {isLoading && <Loading />}
      <main className={styles.main}>
        <Header />
        <section className={styles.infoSection}>
          <div className={styles.address}>{data?.dentistAddress}</div>
          <div className={styles.title}>{data?.dentistName}에서</div>
          {data?.writtenByCurrentUser && (
            <div className={styles.title}>{data?.visitDate}</div>
          )}
          <div className={styles.treatment}>
            {categoryList &&
              categoryList.map((item, index) => (
                <span className={styles.treatmentName} key={index}>
                  {item.category}{" "}
                  {item.category !== "스케일링" &&
                    item.category !== "잇몸" &&
                    item.count > 1 &&
                    `${item.count}개`}
                </span>
              ))}
          </div>
          <div className={styles.title}>치료 완료했습니다</div>
        </section>
        <section className={styles.priceSection}>
          <div className={styles.totalPrice}>
            <span className={styles.label}>총 가격</span>
            <span className={styles.price}>
              {data?.totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className={styles.detailPrices}>
            {data?.treatmentList.map((item, index) => (
              <div className={styles.priceItem} key={index}>
                <span className={styles.label}>{item.category} 치료</span>
                <span className={styles.price}>
                  {item.amount.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>
        </section>
        <DetailTooth treatmentList={data?.treatmentList} />
        {data?.writtenByCurrentUser && <DetailActionButton id={id} />}
      </main>
      <Modal />
    </>
  );
};

export default MedicalDetail;
