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
} & React.ComponentProps<"button">;

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
  const sizeStyle = useMemo<React.CSSProperties>(() => {
    let padding = "";
    let fontSize = "";
    switch (size) {
      case "xs":
        padding = "0rem .25rem";
        fontSize = "12px";
        break;
      case "sm":
        padding = ".25rem .5rem";
        fontSize = "14px";
        break;
      case "md":
        padding = ".5rem 1rem";
        fontSize = "14px";
        break;
      case "lg":
        padding = "1rem 2rem";
        fontSize = "14px";
        break;
      case "xl":
        padding = "1.5rem 4rem";
        fontSize = "20px";
        break;
    }
    return {
      padding,
      fontSize,
    };
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
  }, [variant, disabled, dark, parsedColor, parsedDarkColor, isHover, hover]);
  return (
    <Component
      ref={btnRef as any}
      href={href}
      onClick={onClick}
      className={`d-inline-block cursor-pointer rounded-3 transition-0-2-linear ${className}`}
      style={{
        ...sizeStyle,
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
