import Image from "next/image";
import ContentWrapper from "@/src/components/common/ContentWrapper";

export type Item = {
  device: string;
  imgSrc: string;
};
type EmojiDevicesProps = {
  name: string;
  items: Item[];
  className: string;
};

const EmojiDevices = ({
  name,
  items = [],
  className = "",
}: EmojiDevicesProps) => {
  return (
    <ContentWrapper
      header="H3"
      title={`View ${name} On Different Devices`}
      className={`${className}`}
    >
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item device-emoji d-flex justify-content-between align-items-start py20"
            key={item.device}
          >
            <div className="me-auto">
              <div className="device">
                <h3 className="fz14">View on {item.device}</h3>
              </div>
            </div>
            <div>
              <Image
                src={item.imgSrc}
                alt={item.device}
                width={300}
                height={300}
                className="h-auto"
                style={{
                  width: "60px",
                }}
                onError={(err) => {
                  try {
                    const img = err.target as HTMLImageElement;
                    img.closest(".device-emoji").remove();
                  } catch (err) {}
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </ContentWrapper>
  );
};
export default EmojiDevices;
