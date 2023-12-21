import { forwardRef, type ComponentProps, type ForwardedRef } from "react";
import { Swiper, type SwiperRef } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";

type SwiperCarouselProps = Omit<
  ComponentProps<typeof Swiper>,
  "children" | "ref" | "modules" | "children" | "className"
> & {
  children: React.ReactNode;
  swiperClassName?: string;
  className?: string;
};

const SwiperCarousel = (
  {
    children,
    swiperClassName = "",
    className = "",
    ...rest
  }: SwiperCarouselProps,
  ref: ForwardedRef<SwiperRef>
) => {
  return (
    <div className={`${className}`}>
      <Swiper
        ref={ref}
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
