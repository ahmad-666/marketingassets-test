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
          <h3 className="title text-capitalize fs-6">
            View {name} On Different Devices
          </h3>
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
        </div>
      </div>
    </div>
  );
};
export default EmojiDevices;
