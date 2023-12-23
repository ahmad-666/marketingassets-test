import { useMemo, useState } from "react";
import LineTitle from "@/src/components/others/LineTitle";
import Image from "next/image";
import useHover from "@/src/hooks/useHover";
import styles from "./hubSection.module.scss";

type HubSectionProps = {
  className?: string;
};
type Item = {
  id: number;
  text: string;
  imgSrc: string;
  className?: string;
};

const items: Item[] = [
  {
    id: 1,
    text: "Unleash Your Brand's Unique Personality with CUFinder.",
    imgSrc: "/images/hub/hub-1.svg",
    className: "left-0 top-0",
  },
  {
    id: 2,
    text: "Elevate Your Marketing with CUFinder's Custom Assets.",
    imgSrc: "/images/hub/hub-2.svg",
    className: "right-0 top-0",
  },
  {
    id: 3,
    text: "Unlock Your Brand's Potential with CUFinder's Assets.",
    imgSrc: "/images/hub/hub-3.svg",
    className: "left-0 bottom-0",
  },
  {
    id: 4,
    text: "CUFinder: Your Key to Successful Marketing.",
    imgSrc: "/images/hub/hub-4.svg",
    className: "right-0 bottom-0",
  },
  {
    id: 5,
    text: "Get Noticed with CUFinder's Custom Emojis, Logos, Gifs, and Stickers.",
    imgSrc: "/images/hub/hub-5.svg",
    className: "left-50 top-50",
  },
  {
    id: 6,
    text: "Make a Lasting Impression with CUFinder's Customized Marketing Solutions.",
    imgSrc: "/images/hub/hub-6.svg",
    className: "right-50 top-50",
  },
];
export default function HubSection({ className = "" }: HubSectionProps) {
  const [activeId, setActiveId] = useState(1);
  const activeItem = useMemo(() => {
    return items.find((item) => item.id === activeId);
  }, [activeId]);
  return (
    <div className={`${className}`}>
      <LineTitle title="Hub of Marketing Assets" />
      <div className="position-relative mt-3">
        <Image
          src="/images/hub/hub-bg.png"
          alt="hub"
          width={750}
          height={750}
          className="w-100 h-100 position-absolute left-0 top-0 z-1"
        />
        <div className="position-relative z-2 d-flex justify-content-center align-items-center">
          {items.map((item) => (
            <div
              key={item.id}
              className={`position-absolute rounded-circle overflow-hidden ${styles.item} ${item.className}`}
            >
              <Image
                src={item.imgSrc}
                alt={item.imgSrc}
                width={200}
                height={200}
                className="w-100 h-100"
              />
            </div>
          ))}
          {activeItem && (
            <div className="d-flex flex-column align-items-center">
              <div
                className={`overflow-hidden rounded-circle ${styles["active-item"]}`}
              >
                <Image
                  src={activeItem.imgSrc}
                  alt={activeItem.imgSrc}
                  width={200}
                  height={200}
                  className="w-100 h-100"
                />
              </div>
              <h3 className="fs-4 text-dark-color mt-4">{activeItem.text}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
