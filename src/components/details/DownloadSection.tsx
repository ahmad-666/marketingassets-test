import Icon from "@/src/components/common/Icon";

type DownloadSectionProps = {
  name: string;
  src: string;
  text: string;
  className?: string;
};

export default function DownloadSection({
  name,
  src,
  text,
  className = "",
}: DownloadSectionProps) {
  return (
    <div className={`${className}`}>
      <a
        target="_blank"
        href={src}
        download
        className="btn btn-thm ofr_btn1 btn-block text-capitalize"
      >
        <Icon icon="mdi:download" size="sm" className="mr5" />
        {text}
      </a>
    </div>
  );
}
