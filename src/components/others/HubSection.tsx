import { useState, useMemo, useCallback } from "react";
import LineTitle from "@/src/components/others/LineTitle";
import Image from "next/image";
import Avatar from "@/src/components/common/Avatar";
import useColor from "@/src/hooks/useColor";
import useMediaQuery from "@/src/hooks/useMediaQuery";

type HubSectionProps = {
  className?: string;
};
type Item = {
  id: number;
  text: string;
  imgSrc: string;
  style?: React.CSSProperties;
};

const items: Item[] = [
  {
    id: 1,
    text: "Unleash Your Brand's Unique Personality with CUFinder.",
    imgSrc: "/images/hub/hub-1.svg",
    style: {
      left: "10%",
      top: "0%",
    },
  },
  {
    id: 2,
    text: "Elevate Your Marketing with CUFinder's Custom Assets.",
    imgSrc: "/images/hub/hub-2.svg",
    style: {
      right: "10%",
      top: "0%",
    },
  },
  {
    id: 3,
    text: "Unlock Your Brand's Potential with CUFinder's Assets.",
    imgSrc: "/images/hub/hub-3.svg",
    style: {
      left: "10%",
      bottom: "0%",
    },
  },
  {
    id: 4,
    text: "CUFinder: Your Key to Successful Marketing.",
    imgSrc: "/images/hub/hub-4.svg",
    style: {
      right: "10%",
      bottom: "0%",
    },
  },
  {
    id: 5,
    text: "Get Noticed with CUFinder's Custom Emojis, Logos, Gifs, and Stickers.",
    imgSrc: "/images/hub/hub-5.svg",
    style: {
      left: "20%",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  {
    id: 6,
    text: "Make a Lasting Impression with CUFinder's Customized Marketing Solutions.",
    imgSrc: "/images/hub/hub-6.svg",
    style: {
      right: "20%",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
];
export default function HubSection({ className = "" }: HubSectionProps) {
  const parsedColor = useColor("secondary");
  const [activeId, setActiveId] = useState(1);
  const isMobile = useMediaQuery("(width<768px)");
  const activeItem = useMemo(() => {
    return items.find((item) => item.id === activeId);
  }, [activeId]);
  const mouseEnterHandler = useCallback((id: number) => {
    setActiveId(id);
  }, []);
  const mouseLeaveHandler = useCallback((id: number) => {
    //do nothing , keep latest active id
  }, []);
  return (
    <div className={`${className}`}>
      <LineTitle title="Hub of Marketing Assets" />
      <div className="position-relative mt-5">
        <Image
          src="/images/hub/hub-bg.png"
          alt="hub"
          width={750}
          height={750}
          className="w-100 h-100 position-absolute left-0 top-0 z-1"
        />
        <div className="position-relative z-2 d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="d-flex gap-2 gap-md-3 flex-wrap align-content-center justify-content-center d-md-block">
            {items.map((item) => {
              const isActiveElm = item.id === activeId;
              let style: React.CSSProperties = {
                boxShadow: isActiveElm ? `0 0 20px 0 ${parsedColor}88` : "none",
                opacity: isActiveElm ? 1 : 0.5,
              };
              if (!isMobile) style = { ...style, ...item.style };
              return (
                <Avatar
                  key={item.id}
                  className={`transition-0-2-linear cursor-pointer z-2 ${
                    !isMobile ? "position-absolute" : ""
                  }`}
                  style={style}
                  size={isMobile ? 60 : 70}
                  color={isActiveElm ? "white" : "transparent"}
                  onMouseEnter={() => mouseEnterHandler(item.id)}
                  onMouseLeave={() => mouseLeaveHandler(item.id)}
                >
                  <Image
                    src={item.imgSrc}
                    alt={item.imgSrc}
                    width={200}
                    height={200}
                    className="w-100 h-100 object-fit-cover"
                  />
                </Avatar>
              );
            })}
          </div>
          {activeItem && (
            <div
              key={activeId}
              className="d-flex flex-column align-items-center animate-top-pop pointer-event-none mt-4 mt-md-0"
            >
              <Avatar size={100} color="transparent">
                <Image
                  src={activeItem.imgSrc}
                  alt={activeItem.imgSrc}
                  width={200}
                  height={200}
                  className="w-100 h-100 object-fit-cover"
                />
              </Avatar>
              <h3 className="fs-4 fw-medium text-center text-dark-color mt-4 w-100 w-sm-75 w-md-60">
                {activeItem.text}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
