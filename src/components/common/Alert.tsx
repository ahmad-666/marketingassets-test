import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
import Button from "@/src/components/common/Button";
import Icon from "@/src/components/common/Icon";

type Type = "success" | "danger" | "warning" | "info" | null;

type AlertProps = {
  show?: boolean;
  onChange?: (newVal: boolean) => void;
  type?: Type;
  closeable?: boolean;
  timeout?: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

export default function Alert({
  show = false,
  onChange,
  type = "info",
  closeable = false,
  timeout = -1, //use 0 or any negative value to disable timeout functionality
  children,
  style = {},
  className = "",
}: AlertProps) {
  const timerId = useRef<NodeJS.Timeout>(null!);
  const alertColorClass = useMemo(() => {
    let cssClass = "";
    if (type === "success") cssClass = "bg-success";
    else if (type === "info") cssClass = "bg-info";
    else if (type === "warning") cssClass = "bg-warning";
    else if (type === "danger") cssClass = "bg-danger";
    else cssClass = "bg-transparent";
    return cssClass;
  }, [type]);
  const clearTimer = useCallback(() => {
    clearTimeout(timerId.current);
  }, []);
  const closeAlert = useCallback(() => {
    clearTimer();
    if (onChange) onChange(false);
  }, [clearTimer, onChange]);
  useEffect(() => {
    if (timeout > 0) {
      timerId.current = setTimeout(() => {
        closeAlert();
      }, timeout);
      return () => {
        clearTimer();
      };
    }
  }, [timeout, clearTimer, closeAlert]);
  if (!show) return null;
  return (
    <div
      className={`p-3 rounded-2 d-inline-block overflow-hidden ${alertColorClass} ${className}`}
      style={{
        ...style,
      }}
    >
      <div className="d-flex justify-content-between align-items-center gap-2 ">
        <div className="text-white fz14">{children}</div>
        {closeable && (
          <Button variant="text" size="xs" onClick={closeAlert}>
            <Icon icon="mdi:close" size="sm" className="text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}
