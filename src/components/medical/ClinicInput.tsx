"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ClinicInput.module.scss";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { searchDentist } from "@/api/medicalRecord";
import Highlight from "../common/Highlight";
import { useMedicalWriteStore, useModifyData } from "@/stores/medicalWrite";

type PropsClinicInput = {
  isClinic: boolean;
  setIsClinic: (value: boolean) => void;
  isModify?: boolean;
  noClinic: boolean;
};

const ClinicInput = ({
  isClinic,
  setIsClinic,
  isModify,
  noClinic
}: PropsClinicInput) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { updateDentistId } = useMedicalWriteStore();
  const { dentistName } = useModifyData();

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchClinic", debouncedQuery],
    queryFn: () => searchDentist(debouncedQuery),
    enabled: !!debouncedQuery
  });

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

  const selectClinic = (name: string, id: number) => {
    setIsClinic(false);
    setSearchName(name);
    updateDentistId(Number(id));
  };

  useEffect(() => {
    if (dentistName && isModify) {
      setSearchName(dentistName);
    }
  }, [dentistName, isModify]);

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
                  <img src="/spinner.gif" alt="loading" />
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
                <li
                  key={index}
                  className={styles.clinicItem}
                  onClick={() => {
                    selectClinic(clinic.dentistName, clinic.dentistId);
                  }}
                >
                  <div className={styles.clinicInfo}>
                    <span className={styles.clinicName}>
                      <Highlight
                        text={clinic.dentistName}
                        highlight={searchName}
                        color={"black"}
                      />
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
      {noClinic && (
        <span className={styles.errorText}>치과명을 입력해 주세요.</span>
      )}
    </motion.div>
  );
};

export default ClinicInput;
