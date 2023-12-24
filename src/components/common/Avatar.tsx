import { type ComponentProps } from "react";
import useColor from "@/src/hooks/useColor";

type AvatarProps = {
  size?: number;
  color?: string;
  children?: React.ReactNode;
} & ComponentProps<"div">;

export default function Avatar({
  size = 30,
  color = "primary",
  children,
  className = "",
  style = {},
  ...rest
}: AvatarProps) {
  const parsedColor = useColor(color);
  return (
    <div
      className={`rounded-circle overflow-hidden d-flex flex-column justify-content-center align-items-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: parsedColor,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
