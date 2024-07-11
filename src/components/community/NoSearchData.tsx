import styles from "./NoSearchData.module.scss";

type PropsNoSearch = {
  searchType: string;
};

type NoSearchDataType = {
  [key in PropsNoSearch["searchType"]]: {
    src: string;
    content: string;
  };
};

const NoSearchData = ({ searchType }: PropsNoSearch) => {
  const noData: NoSearchDataType = {
    post: {
      src: "/no-search.png",
      content: "열람할수 있는"
    },
    word: {
      src: "/no-search-word.png",
      content: "검색어가 속한"
    }
  };

  return (
    <div className={styles.NoSearchData}>
      <img src={noData[searchType].src} alt="no-data" />
      <p>
        {noData[searchType].content} <br />
        게시글이 없습니다
      </p>
    </div>
  );
};

export default NoSearchData;
