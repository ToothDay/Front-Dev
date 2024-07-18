"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ClinicInput.module.scss";
import _ from "lodash";
import { useQuery } from "react-query";
import { searchDentist } from "@/api/medicalRecord";
import Loading from "@/app/loading";

type PropsClinicInput = {
  isClinic: boolean;
  setIsClinic: (value: boolean) => void;
};

const ClinicInput = ({ isClinic, setIsClinic }: PropsClinicInput) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsClinic(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const { data, isLoading, error } = useQuery(
    ["searchClinic", debouncedQuery],
    () => searchDentist(debouncedQuery),
    {
      enabled: !!debouncedQuery,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const getSearchData = useCallback(
    _.debounce((value: string) => {
      setDebouncedQuery(value);
      setIsClinic(!!value);
    }, 500),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchName(value);
    getSearchData(value);
  };

  const foldInput = () => {
    setIsClinic(false);
    setSearchName("");
    searchRef.current?.focus();
  };

  return (
    <motion.div
      className={styles.writeWrapper}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
      }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      ref={wrapperRef}
    >
      <label className={styles.writeLabel}>
        진료를 진행한 치과를 <br /> 설정해 주세요.
      </label>
      <div className={styles.inputField}>
        <div
          className={[styles.clinicInput, isClinic ? styles.openList : ""].join(
            " "
          )}
        >
          <input
            type="text"
            className={styles.searchClinic}
            placeholder="치과명으로 찾아주세요."
            onChange={handleInputChange}
            value={searchName}
            ref={searchRef}
          />
        </div>
        <AnimatePresence>
          {isClinic && (
            <motion.ul
              className={styles.dentalClinicList}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              {isLoading && (
                <li className={styles.loadingItem}>
                  <Loading useBg={false} />
                </li>
              )}

              {error ||
                (data?.length === 0 && (
                  <li className={styles.noData}>
                    <span>치과 검색 결과가 없습니다.</span>
                    <button
                      type="button"
                      className={styles.fold}
                      onClick={foldInput}
                    >
                      접기
                    </button>
                  </li>
                ))}
              {data?.map((clinic: any, index: number) => (
                <li key={index} className={styles.clinicItem}>
                  <div className={styles.clinicInfo}>
                    <span className={styles.clinicName}>
                      {clinic.dentistName}
                    </span>
                    <span className={styles.clinicLocation}>
                      {clinic.dentistAddress}
                    </span>
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <img src="/search-icon.svg" alt="search" className={styles.inputIcon} />
      </div>
    </motion.div>
  );
};

export default ClinicInput;
