import styles from "./loading.module.scss";

type PropsLoading = {
  useBg?: boolean;
};

const Loading = ({ useBg }: PropsLoading) => {
  return (
    <div className={[styles.loading, useBg ? styles.background : ""].join(" ")}>
      <img src="/spinner.gif" alt="loading" className={styles.loadingImage} />
    </div>
  );
};

export default Loading;
