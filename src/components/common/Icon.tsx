//we have many icon packs like mdi,google material design,ionic,bootstrap,font awesome,feather,hero,country flags,emojis,...

import { useMemo } from "react";
import { Icon as Iconify } from "@iconify/react";

export type IconProps = {
  icon: string;
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  rotate?: 90 | 180 | 270;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function Icon({
  icon, //e.g mdi:home-variant-outline
  size = "md",
  rotate,
  horizontalFlip,
  verticalFlip,
  onClick,
  className = "",
  style,
}: IconProps) {
  const rotateNormalize = useMemo(() => {
    if (rotate === 90) return 1;
    else if (rotate === 180) return 2;
    else if (rotate === 270) return 3;
  }, [rotate]);
  const sizeNormalize = useMemo(() => {
    if (size === "xs") return 15;
    else if (size === "sm") return 20;
    else if (size === "md") return 25;
    else if (size === "lg") return 30;
    else if (size === "xl") return 35;
    return size;
  }, [size]);
  return (
    <i
      className={`inline-block ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Iconify
        icon={icon}
        width={sizeNormalize}
        height={sizeNormalize}
        rotate={rotateNormalize}
        hFlip={horizontalFlip}
        vFlip={verticalFlip}
      />
    </i>
  );
}
