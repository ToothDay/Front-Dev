"use client";
import styles from "./Error.module.scss";

type ErrorType = "client" | "server" | "error";

type ErrorProps = {
  errorType: ErrorType;
};

const Error = ({ errorType }: ErrorProps) => {
  const typeImage = {
    client: "/error404.png",
    server: "/error500.png",
    error: "/error.png"
  };

  const backToPage = () => {
    history.back();
  };

  return (
    <main className={styles.main}>
      <div className={styles.error}>
        <img
          src={typeImage[errorType]}
          alt="error404"
          className={styles.errorImg}
        />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          죄송합니다.
          <br />
          요청하신 페이지를 불러올 수 없습니다.
        </p>
        <button type="button" className={styles.button} onClick={backToPage}>
          이전 페이지로 돌아가기
        </button>
      </div>
    </main>
  );
};

export default Error;
