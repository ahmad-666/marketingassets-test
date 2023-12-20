import { useMemo, useRef } from "react";
import Link from "next/link";
import SpinnerLoader from "@/src/components/loaders/SpinnerLoader";
import useColor from "@/src/hooks/useColor";
import useHover from "@/src/hooks/useHover";

type Variant = "filled" | "outlined" | "text";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonProps = {
  variant?: Variant;
  children: React.ReactNode;
  size?: Size;
  color?: string;
  dark?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hover?: boolean;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

export default function Button({
  variant = "filled",
  children,
  size = "md",
  color = "primary", //'primary','primary-darken1','red','#f00','rgb(255,0,0)'
  dark = false,
  disabled = false,
  loading = false,
  hover = true,
  href,
  onClick,
  style = {},
  className = "",
}: ButtonProps) {
  const btnRef = useRef<HTMLElement>(null!);
  const parsedColor = useColor(color);
  const parsedDarkColor = useColor("dark");
  const isHover = useHover(btnRef);
  const Component = useMemo(() => {
    return !href ? "button" : Link;
  }, [href]);
  const sizeClass = useMemo(() => {
    let padding = "";
    let fontSize = "";
    switch (size) {
      case "xs":
        padding = "py-0 px-1";
        fontSize = "fz12";
        break;
      case "sm":
        padding = "py-1 px-2";
        fontSize = "fz14";
        break;
      case "md":
        padding = "py-2 px-3";
        fontSize = "fz16";
        break;
      case "lg":
        padding = "py-3 px-5";
        fontSize = "fs-5";
        break;
      case "xl":
        padding = "py-4 px-6";
        fontSize = "fs-3";
        break;
    }
    return `${padding} ${fontSize}`;
  }, [size]);
  const colorStyles = useMemo<React.CSSProperties>(() => {
    let backgroundColor = "";
    let color = "";
    let border = "";
    let opacity = "";
    if (variant === "filled") {
      backgroundColor = hover && isHover ? `${parsedColor}bb` : parsedColor;
      color = dark ? "white" : parsedDarkColor;
      border = "none";
    } else if (variant === "outlined") {
      backgroundColor = hover && isHover ? `${parsedColor}22` : "transparent";
      color = parsedColor;
      border = `1px solid ${parsedColor}`;
    } else if (variant === "text") {
      backgroundColor = hover && isHover ? `${parsedColor}22` : "transparent";
      color = parsedColor;
      border = "none";
    }
    if (disabled) opacity = ".4";
    return {
      backgroundColor,
      color,
      border,
      opacity,
    };
  }, [variant, disabled, dark, parsedColor, parsedDarkColor, isHover]);
  return (
    <Component
      ref={btnRef as any}
      href={href}
      onClick={onClick}
      className={`d-inline-block cursor-pointer rounded-3 transition-0-2-linear ${sizeClass} ${className}`}
      style={{
        ...colorStyles,
        ...style,
      }}
      disabled={disabled || loading}
    >
      <span className="d-flex justify-content-center align-items-center">
        {!loading ? (
          children
        ) : (
          <SpinnerLoader
            color={variant === "filled" ? "white" : color}
            size={25}
          />
        )}
      </span>
    </Component>
  );
}
