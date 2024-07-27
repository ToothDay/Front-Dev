"use client";
import { VisitData } from "@/api/medical";
import Loading from "@/app/loading";
import styles from "@/components/common/HistoryCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PropsCard = {
  cardType: "myHistory" | "otherHistory";
  userData: VisitData[];
};

const HistoryCard = ({ cardType, userData }: PropsCard) => {
  const router = useRouter();
  const [isImageError, setIsImageError] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageError = (visitId: number) => {
    if (!isImageError[visitId]) {
      setIsImageError((prev) => ({ ...prev, [visitId]: true }));
    }
  };

  const handleViewAll = (visitId: string) => {
    setIsLoading(true);
    if (cardType === "myHistory") {
      router.push(`/medical/detail/${visitId}?type=my`);
    } else {
      router.push(`/medical/detail/${visitId}?type=other`);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <>
      {isLoading && <Loading />}
      {userData.map((data) => (
        <div key={data.visitId} className={styles.card}>
          <div className={styles.dentistInfo}>
            <div className={styles.cardTop}>
              <div className={styles.visitDentist}>
                {cardType === "myHistory" && (
                  <span className={styles.visitDate}>{data.visitDate}</span>
                )}
                <p className={styles.dentistName}>{data.dentistName}</p>
              </div>
              <button
                className={styles.moreButton}
                onClick={() => handleViewAll(String(data.visitId))}
              >
                전체보기
              </button>
            </div>
            <p className={styles.address}>{data.dentistAddress}</p>
            <div className={styles.cardBottom}>
              <p>
                치료종류:{" "}
                {data.treatmentList &&
                  data.treatmentList
                    .map((treatment) => treatment.category)
                    .join(", ")}
              </p>
              <p>총 가격: {data.totalAmount.toLocaleString()}원</p>
              {cardType === "otherHistory" && (
                <div className={styles.imageContainer}>
                  <Image
                    src={
                      data.profileImageUrl && !isImageError[data.visitId]
                        ? data.profileImageUrl.startsWith("http://") ||
                          data.profileImageUrl.startsWith("https://")
                          ? `${data.profileImageUrl}`
                          : `${process.env.IMAGE_PATH}${data.profileImageUrl}`
                        : "profile.svg"
                    }
                    alt="tooth"
                    width={42}
                    height={42}
                    className={styles.profileIcon}
                    loading="lazy"
                    blurDataURL="/profile.svg"
                    placeholder="blur"
                    onError={() => handleImageError(data.visitId)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HistoryCard;
