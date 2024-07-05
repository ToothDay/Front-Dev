"use client";

import styles from "@/components/common/Tab.module.scss";
import { useState } from "react";

type PropsTab = {
  pageType: "myPage" | "page";
};

const Tab = ({ pageType }: PropsTab) => {
  const [activeTab, setActiveTab] = useState<string>("진료기록");
  const tabList: string[] = ["진료기록", "커뮤니티", "MY"];

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
