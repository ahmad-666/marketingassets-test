import { useCallback } from "react";

type DownloadSectionProps = {
  name: string;
  imgSrc: string;
  className?: string;
};

export default function DownloadSection({
  name,
  imgSrc,
  className = "",
}: DownloadSectionProps) {
  const downloadHandler = useCallback(() => {
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = name;
    a.click();
    a.remove();
  }, [name, imgSrc]);
  return (
    <div className={`${className}`}>
      <button
        className="btn btn-thm ofr_btn1 btn-block mt0 mb20"
        onClick={downloadHandler}
      >
        <span className="flaticon-download mr10 fz18 vam" />
        {`Download ${name} Logo in PNG Format`}
      </button>
    </div>
  );
}
