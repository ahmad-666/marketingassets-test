import useColor from "@/src/hooks/useColor";

type DividerProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
};

export default function Divider({
  width = "100%",
  height = 2,
  color = "gray-main",
  className = "",
}: DividerProps) {
  const parsedColor = useColor(color);
  return (
    <div
      className={`${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: parsedColor,
      }}
    >
      Divider
    </div>
  );
}
