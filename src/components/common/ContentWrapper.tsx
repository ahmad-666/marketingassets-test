import { useMemo } from "react";

type Header = "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
type ContentWrapperProps = {
  header?: Header;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const headersTags = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
};
export default function ContentWrapper({
  header = "H3",
  title,
  children,
  className = "",
}: ContentWrapperProps) {
  const HeaderTag = useMemo(() => {
    return headersTags[header] as any;
  }, [header]);
  return (
    <div className={`info_widgets p30 ${className}`}>
      <HeaderTag className="title text-capitalize">{title}</HeaderTag>
      <div className="mt30">{children}</div>
    </div>
  );
}
