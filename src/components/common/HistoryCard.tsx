"use client";
import { VisitData } from "@/api/medical";
import styles from "@/components/common/HistoryCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PropsCard = {
  cardType: "myHistory" | "otherHistory";
  userData: VisitData[];
};

const HistoryCard = ({ cardType, userData }: PropsCard) => {
  const router = useRouter();
  const [isImageError, setIsImageError] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageError = (visitId: number) => {
    if (!isImageError[visitId]) {
      setIsImageError((prev) => ({ ...prev, [visitId]: true }));
    }
  };


  useEffect(() => {
    const initialLoadingState = userData.reduce(
      (acc, data) => {
        acc[data.visitId] = true;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setIsImageError({});
  }, [userData]);

  const handleViewAll = (visitId: string) => {
    if (cardType === "myHistory") {
      router.push(`/medical/detail/${visitId}?type=my`);
    } else {
      router.push(`/medical/detail/${visitId}?type=other`);
    }
  };

  return (
    <>
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
                          ? data.profileImageUrl
                          : "/profile.svg"
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
