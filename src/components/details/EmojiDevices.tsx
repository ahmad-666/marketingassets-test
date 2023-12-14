import Image from "next/image";

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
    <div className={`${className}`}>
      <div className="info_widgets p30">
        <div className="wrapper">
          <h4 className="title text-capitalize">
            View {name} On Different Devices
          </h4>
          <ul className="list-group">
            {items.map((item) => (
              <li
                className="list-group-item device-emoji d-flex justify-content-between align-items-start py20"
                key={item.device}
              >
                <div className="me-auto">
                  <div className="device">
                    <span>View on {item.device}</span>
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
        </div>
      </div>
    </div>
  );
};
export default EmojiDevices;
