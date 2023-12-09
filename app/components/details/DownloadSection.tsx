"use client";

import Icon from "@/app/components/common/Icon";

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
  return (
    <div className={`${className}`}>
      <a
        target="_blank"
        href={imgSrc}
        download
        className="btn btn-thm ofr_btn1 btn-block text-capitalize"
      >
        <Icon icon="mdi:download" size="sm" className="mr5" />
        {`Download ${name} Logo in PNG Format`}
      </a>
    </div>
  );
}
