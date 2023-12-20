import useColor from "@/src/hooks/useColor";
import styles from "./spinnerLoader.module.scss";

type SpinnerLoaderProps = {
  size?: number;
  color?: string;
  className?: string;
};
export default function SpinnerLoader({
  size = 60,
  color = "primary",
  className = "",
}: SpinnerLoaderProps) {
  const parsedColor = useColor(color);
  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <div
        className={`${styles["half-circle-spinner"]}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className={`${styles["circle"]} ${styles["circle-1"]}`}
          style={{
            borderTopColor: parsedColor,
            borderWidth: `${size / 10}px`,
          }}
        ></div>
        <div
          className={`${styles["circle"]} ${styles["circle-2"]}`}
          style={{
            borderBottomColor: parsedColor,
            borderWidth: `${size / 10}px`,
          }}
        ></div>
      </div>
    </div>
  );
}
