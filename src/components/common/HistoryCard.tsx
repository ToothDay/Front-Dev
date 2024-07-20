"use client";
import { VisitData } from "@/api/medical";
import styles from "@/components/common/HistoryCard.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

type PropsCard = {
  cardType: "myHistory" | "otherHistory";
  userData: VisitData[];
};

const HistoryCard = ({ cardType, userData }: PropsCard) => {
  const [isImageError, setIsImageError] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isImageLoading, setIsImageLoading] = useState<{
    [key: number]: boolean;
  }>({});

  const handleImageError = (visitID: number) => {
    if (!isImageError[visitID]) {
      setIsImageError((prev) => ({ ...prev, [visitID]: true }));
      setIsImageLoading((prev) => ({ ...prev, [visitID]: false }));
    }
  };

  const handleImageLoad = (visitID: number) => {
    if (isImageLoading[visitID]) {
      setIsImageLoading((prev) => ({ ...prev, [visitID]: false }));
    }
  };

  useEffect(() => {
    const initialLoadingState = userData.reduce(
      (acc, data) => {
        acc[data.visitID] = true;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setIsImageLoading(initialLoadingState);
    setIsImageError({});
  }, [userData]);

  return (
    <>
      {userData.map((data) => (
        <div key={data.visitID} className={styles.card}>
          <div className={styles.dentistInfo}>
            <div className={styles.cardTop}>
              <button className={styles.moreButton}>전체보기</button>
              {cardType === "myHistory" && <span>{data.visitDate}</span>}
              <p className={styles.dentistName}>{data.dentistName}</p>
              <p>{data.dentistAddress}</p>
            </div>
            <div className={styles.cardBottom}>
              <p>
                치료종류:{" "}
                {data.treatmentList
                  .map((treatment) => treatment.category)
                  .join(", ")}
              </p>
              <p>총 가격: {data.totalAmount.toLocaleString()}원</p>
              {cardType === "otherHistory" && (
                <div className={styles.imageContainer}>
                  {isImageLoading[data.visitID] ? (
                    <Image
                      src="/profile.svg"
                      alt="loading"
                      width={42}
                      height={42}
                      className={styles.profileIcon}
                    />
                  ) : (
                    <Image
                      src={
                        data.profileImageUrl && !isImageError[data.visitID]
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
                      onLoad={() => handleImageLoad(data.visitID)}
                      onError={() => handleImageError(data.visitID)}
                    />
                  )}
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
