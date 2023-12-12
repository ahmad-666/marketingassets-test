import styles from "./spinnerLoader.module.scss";

type SpinnerLoaderProps = {
  className?: string;
};
export default function SpinnerLoader({ className = "" }: SpinnerLoaderProps) {
  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <div className={`${styles["half-circle-spinner"]}`}>
        <div className={`${styles["circle"]} ${styles["circle-1"]}`}></div>
        <div className={`${styles["circle"]} ${styles["circle-2"]}`}></div>
      </div>
    </div>
  );
}
