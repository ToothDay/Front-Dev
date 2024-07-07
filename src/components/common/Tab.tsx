"use client";

import styles from "@/components/common/Tab.module.scss";
import { useEffect } from "react";
import { useTabStore } from "@/stores/tab";

type PropsTab = {
  pageType: "myPage" | "page";
  initialActiveTab: string;
};

const Tab = ({ pageType, initialActiveTab }: PropsTab) => {
  const { activeTab, setActiveTab } = useTabStore();
  const tabList: string[] = ["진료기록", "커뮤니티", "MY"];

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);

  return (
    <nav className={styles.nav}>
      {tabList.map((tab: string, index: number) => (
        <button
          type="button"
          key={index}
          className={[
            styles.tabButton,
            pageType === "myPage" ? styles.blue : "",
            tab === activeTab ? styles.active : ""
          ].join(" ")}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tab;
