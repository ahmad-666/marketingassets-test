import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "@/src/components/common/Button";
import Icon from "@/src/components/common/Icon";
import useClient from "@/src/hooks/useClient";

export type Type = "success" | "error";
export type SnackbarProps = {
  show?: boolean;
  onChange: (newValue: boolean) => void;
  type?: Type;
  closable?: boolean;
  timeout?: number;
  children: ReactNode;
  className?: string;
};

export default function Snackbar({
  show = false,
  onChange,
  type = "success",
  closable = false,
  timeout = 3000, //use 0 or any negative value to disable timeout functionality
  children,
  className = "",
}: SnackbarProps) {
  const isClient = useClient();
  const timerId = useRef<NodeJS.Timeout>(null!);
  const clearTimer = useCallback(() => {
    clearTimeout(timerId.current);
  }, []);
  const closeHandler = useCallback(() => {
    clearTimer();
    onChange(false);
  }, [clearTimer, onChange]);
  useEffect(() => {
    if (timeout > 0) {
      timerId.current = setTimeout(() => {
        closeHandler();
      }, timeout);
      return () => {
        clearTimer();
      };
    }
  }, [timeout, clearTimer, closeHandler]);
  if (!show || !isClient) return null;
  return createPortal(
    <div
      className={`p-3 rounded-2 position-fixed z5 left-50 overflow-hidden ${
        type === "success" ? "bg-success" : "bg-danger"
      } ${className}`}
      style={{
        transform: "translateX(-50%)",
        bottom: "3%",
        width: "320px",
        maxWidth: "90%",
      }}
    >
      <div className="d-flex justify-content-between align-items-center gap-2">
        <div className="text-white fz14">{children}</div>
        {closable && (
          <Button onClick={closeHandler} size="xs" variant="text">
            <Icon icon="mdi:close" size="sm" className="text-white" />
          </Button>
        )}
      </div>
    </div>,
    document.querySelector("#portals")
  );
}
