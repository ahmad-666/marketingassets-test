import {
  useCallback,
  forwardRef,
  type MutableRefObject,
  type ComponentProps,
  type ForwardedRef,
} from "react";
import { Swiper, type SwiperRef } from "swiper/react";
import { Pagination, Navigation, type Swiper as SwiperType } from "swiper";
import "swiper/swiper.css";

type SwiperCarouselProps = Omit<
  ComponentProps<typeof Swiper>,
  "children" | "ref" | "modules" | "children" | "className"
> & {
  children: React.ReactNode;
  swiperClassName?: string;
  containerRef?: MutableRefObject<SwiperRef>;
  className?: string;
};

const SwiperCarousel = (
  {
    children,
    swiperClassName = "",
    containerRef,
    className = "",
    ...rest
  }: SwiperCarouselProps,
  ref: MutableRefObject<SwiperType>
) => {
  const onSwiperHandler = useCallback(
    (swiper: SwiperType) => {
      ref.current = swiper;
    },
    [ref]
  );
  return (
    <div className={`${className}`}>
      <Swiper
        ref={containerRef}
        onSwiper={onSwiperHandler}
        modules={[Pagination, Navigation]}
        className={`${swiperClassName}`}
        {...rest}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default forwardRef(SwiperCarousel);
