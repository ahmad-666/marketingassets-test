import Image from "next/image";
import SwiperCarousel from "@/src/components/common/SwiperCarousel";
import { SwiperSlide } from "swiper/react";

type BrandsListProps = {
  className?: string;
};
type Brand = {
  name: string;
  imgSrc: string;
};
const brands: Brand[] = [
  {
    name: "airbnb",
    imgSrc: "/images/brands/airbnb.png",
  },
  {
    name: "booking",
    imgSrc: "/images/brands/booking.png",
  },
  {
    name: "expedia",
    imgSrc: "/images/brands/expedia.png",
  },
  {
    name: "goibibo",
    imgSrc: "/images/brands/goibibo.png",
  },
  {
    name: "make-my-trip",
    imgSrc: "/images/brands/make-my-trip.png",
  },
  {
    name: "trip-advisor",
    imgSrc: "/images/brands/trip-advisor.png",
  },
];
export default function BrandsList({ className = "" }: BrandsListProps) {
  return (
    <div className={`${className}`}>
      <SwiperCarousel
        autoplay={{
          disableOnInteraction: false,
          waitForTransition: true,
          pauseOnMouseEnter: true,
          delay: 3000,
        }}
        loop
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.name}>
            <Image
              src={brand.imgSrc}
              alt={brand.name}
              width={400}
              height={400}
              className="w-auto max-w-100"
              style={{
                height: "40px",
              }}
            />
          </SwiperSlide>
        ))}
      </SwiperCarousel>
    </div>
  );
}
