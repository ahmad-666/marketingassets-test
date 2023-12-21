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
    imgSrc: "/images/public/brands/airbnb.png",
  },
  {
    name: "booking",
    imgSrc: "/images/public/brands/booking.png",
  },
  {
    name: "expedia",
    imgSrc: "/images/public/brands/expedia.png",
  },
  {
    name: "goibibo",
    imgSrc: "/images/public/brands/goibibo.png",
  },
  {
    name: "make-my-trip",
    imgSrc: "/images/public/brands/make-my-trip.png",
  },
  {
    name: "trip-advisor",
    imgSrc: "/images/public/brands/trip-advisor.png",
  },
];
export default function BrandsList({ className = "" }: BrandsListProps) {
  return (
    <div className={`${className}`}>
      <SwiperCarousel
        spaceBetween={20}
        slidesPerView={1}
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
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.name}>
            <Image
              src={brand.imgSrc}
              alt={brand.name}
              width={400}
              height={400}
              className="h-auto w-100"
            />
          </SwiperSlide>
        ))}
      </SwiperCarousel>
    </div>
  );
}
