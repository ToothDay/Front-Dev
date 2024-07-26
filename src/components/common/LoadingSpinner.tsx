import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <img src="/spinner.gif" className={styles.spinner} alt="spinner" />
    </div>
  );
};

export default LoadingSpinner;
