import styles from "./NoSearchData.module.scss";

type PropsNoSearch = {
  searchType: string;
};

type NoSearchDataType = {
  [key in PropsNoSearch["searchType"]]: {
    src: string;
    content: string;
    subContent: string;
  };
};

const NoSearchData = ({ searchType }: PropsNoSearch) => {
  const noData: NoSearchDataType = {
    post: {
      src: "/no-search.png",
      content: "열람할 수 있는",
      subContent: "게시글이 없습니다"
    },
    word: {
      src: "/no-search-word.png",
      content: "검색어가 속한",
      subContent: "게시글이 없습니다"
    },
    record: {
      src: "/no-search-record.png",
      content: "열람할 수 있는",
      subContent: "진료 기록이 없습니다"
    }
  };

  return (
    <div className={styles.NoSearchData}>
      <img src={noData[searchType].src} alt="no-data" />
      <p>
        {noData[searchType].content} <br />
        {noData[searchType].subContent}
      </p>
    </div>
  );
};

export default NoSearchData;
