"use client";

import styles from "@/components/common/Tab.module.scss";
import { useEffect } from "react";
import { useTabStore } from "@/stores/tab";
import Link from "next/link";

type PropsTab = {
  pageType: "myPage" | "page";
  initialActiveTab: string;
};

type TabList = {
  name: string;
  route: string;
};

const Tab = ({ pageType, initialActiveTab }: PropsTab) => {
  const { activeTab, setActiveTab } = useTabStore();
  const tabList: TabList[] = [
    { name: "진료기록", route: "/medical" },
    { name: "커뮤니티", route: "/community" },
    { name: "MY", route: "/my-page" }
  ];

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);

  return (
    <nav className={styles.nav}>
      {tabList.map((tab, index) => (
        <button
          type="button"
          key={index}
          className={[
            styles.tabButton,
            pageType === "myPage" ? styles.blue : "",
            tab.name === activeTab ? styles.active : ""
          ].join(" ")}
          onClick={() => setActiveTab(tab.name)}
        >
          <Link href={tab.route}>{tab.name}</Link>
        </button>
      ))}
    </nav>
  );
};

export default Tab;
