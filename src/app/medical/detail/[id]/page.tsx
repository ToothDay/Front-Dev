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

type PropsPage = {
  params: {
    id: string;
  };
  searchParams: {
    type: "me" | "other";
  };
};

type CategoryList = {
  category: string;
  count: number;
};

const getMyMedicalDetail = async (
  id: string
): Promise<VisitMyDetail | undefined> => {
  try {
    const response = await fetchMyMedicalDetail(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getOtherMedicalDetail = async (
  id: string
): Promise<VisitDetail | undefined> => {
  try {
    const response = await fetchOtherMedicalDetail(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const MedicalDetail = async ({ params, searchParams }: PropsPage) => {
  let data: VisitMyDetail | VisitDetail | undefined;
  if (searchParams.type === "me") {
    data = await getMyMedicalDetail(params.id);
  } else {
    data = await getOtherMedicalDetail(params.id);
  }

  if (!data) {
    return "-";
  }

  const categoryList: CategoryList[] = data.treatmentList.reduce<
    CategoryList[]
  >((acc, item) => {
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
      <main className={styles.main}>
        <Header />
        <section className={styles.infoSection}>
          <div className={styles.address}>{data?.dentistAddress}</div>
          <div className={styles.title}>{data?.dentistName}에서</div>
          {data?.writtenByCurrentUser && (
            <div className={styles.title}>{data?.visitDate}</div>
          )}
          <div className={styles.treatment}>
            {categoryList.map((item, index) => (
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
        {data?.writtenByCurrentUser && <DetailActionButton id={params.id} />}
      </main>
      <Modal />
    </>
  );
};

export default MedicalDetail;
