import { useCallback, useRef } from "react";
import Link from "next/link";
import Button from "@/src/components/common/Button";
import Icon from "@/src/components/common/Icon";
import { SwiperSlide, type SwiperRef } from "swiper/react";
import SwiperCarousel from "@/src/components/common/SwiperCarousel";
import EmojiCategoryCard, {
  type EmojiCategoryCardProps as CategoryType,
} from "./EmojiCategoryCard";

type EmojiCategoriesListProps = {
  className?: string;
};
type Category = Omit<CategoryType, "className"> & { link: string };
const categories: Category[] = [
  {
    title: "People Emoji",
    text: "List of all people emojis",
    imgSrc: "/images/emojis/people.svg",
    link: "/people-emoji",
  },
  {
    title: "Nature Emoji",
    text: "List of all nature emojis",
    imgSrc: "/images/emojis/nature.svg",
    link: "/nature-emoji",
  },
  {
    title: "Food & Drink Emoji",
    text: "List of all food & drink emojis",
    imgSrc: "/images/emojis/food.svg",
    link: "/food-drink-emoji",
  },
  {
    title: "Activity Emoji",
    text: "List of all activity emojis",
    imgSrc: "/images/emojis/activity.svg",
    link: "/activity-emoji",
  },
  {
    title: "Travel & Places Emoji",
    text: "List of all travel & places emojis",
    imgSrc: "/images/emojis/travel.svg",
    link: "/travel-places-emoji",
  },
  {
    title: "Objects Emoji",
    text: "List of all objects emojis",
    imgSrc: "/images/emojis/object.svg",
    link: "/objects-emojis",
  },
  {
    title: "Symbols Emoji",
    text: "List of all symbols emojis",
    imgSrc: "/images/emojis/symbol.svg",
    link: "/symbols-emoji",
  },
  {
    title: "Flags Emoji",
    text: "List of all flags emojis",
    imgSrc: "/images/emojis/flag.svg",
    link: "/flags-emoji",
  },
];
export default function EmojiCategoriesList({
  className = "",
}: EmojiCategoriesListProps) {
  const swiper = useRef<SwiperRef>(null!);
  const prevSlide = useCallback(() => {}, []);
  const nextSlide = useCallback(() => {}, []);
  return (
    <div className={`${className}`}>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <h2 className="fs-2 text-dark-color">Emojis categories</h2>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="filled"
            size="md"
            color="gray-lighten"
            onClick={prevSlide}
          >
            <Icon
              icon="mdi:chevron-left"
              size="md"
              className="text-dark-color"
            />
          </Button>
          <Button
            variant="filled"
            size="md"
            color="gray-lighten"
            onClick={nextSlide}
          >
            <Icon
              icon="mdi:chevron-right"
              size="md"
              className="text-dark-color"
            />
          </Button>
        </div>
      </div>
      <SwiperCarousel
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
        }}
        ref={swiper}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.title}>
            <Link href={category.link}>
              <EmojiCategoryCard
                title={category.title}
                text={category.text}
                imgSrc={category.imgSrc}
              />
            </Link>
          </SwiperSlide>
        ))}
      </SwiperCarousel>
    </div>
  );
}
