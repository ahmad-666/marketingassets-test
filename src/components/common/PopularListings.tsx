import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const listingCar = (module.exports = [
  {
    id: 1,
    featured: true,
    image: "/images/listing/1.jpg",
    photosCount: 22,
    videosCount: 3,
    title: "Volvo XC90 - 2023",
    price: 129,
    rating: 4.7,
    reviewsCount: 684,
    mileage: "4789",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used"],
  },
  {
    id: 2,
    featured: true,
    image: "/images/listing/2.jpg",
    photosCount: 33,
    videosCount: 4,
    title: "Mercedes-Benz S 560 - 2021",
    price: 56,
    rating: 4.7,
    reviewsCount: 565,
    mileage: "6786",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new"],
  },
  {
    id: 3,
    featured: false,
    image: "/images/listing/3.jpg",
    photosCount: 55,
    videosCount: 3,
    title: "BMW M8 Gran Coupe Base - 2023",
    price: 230,
    rating: 4.7,
    reviewsCount: 323,
    mileage: "7866",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used"],
  },
  {
    id: 4,
    featured: true,
    image: "/images/listing/4.jpg",
    photosCount: 12,
    videosCount: 3,
    title: "Nıssan Qasqai - Sky Pack",
    price: 478,
    rating: 4.7,
    reviewsCount: 345,
    mileage: "5436",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new", "used"],
  },
  {
    id: 5,
    featured: false,
    image: "/images/listing/5.jpg",
    photosCount: 22,
    videosCount: 3,
    title: "Audi A8 L 55 - 2021",
    price: 129,
    rating: 4.7,
    reviewsCount: 684,
    mileage: "4789",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used"],
  },
  {
    id: 6,
    featured: false,
    image: "/images/listing/6.jpg",
    photosCount: 33,
    videosCount: 4,
    title: "Land Rover Range HSE Westminster",
    price: 56,
    rating: 4.7,
    reviewsCount: 565,
    mileage: "6786",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new", "used"],
  },
  {
    id: 7,
    featured: true,
    image: "/images/listing/7.jpg",
    photosCount: 55,
    videosCount: 3,
    title: "Bentley Bentayga V8 - 2023",
    price: 230,
    rating: 4.7,
    reviewsCount: 323,
    mileage: "7866",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used", "new"],
  },
  {
    id: 8,
    featured: true,
    image: "/images/listing/8.jpg",
    photosCount: 12,
    videosCount: 3,
    title: "Ferrari 488 Spider Base - 2019",
    price: 478,
    rating: 4.7,
    reviewsCount: 345,
    mileage: "5436",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new", "used"],
  },
  {
    id: 9,
    featured: false,
    image: "/images/listing/4.jpg",
    photosCount: 22,
    videosCount: 3,
    title: "Audi A8 L 55 - 2021",
    price: 129,
    rating: 4.7,
    reviewsCount: 684,
    mileage: "4789",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used"],
  },
  {
    id: 10,
    featured: true,
    image: "/images/listing/9.jpg",
    photosCount: 33,
    videosCount: 4,
    title: "Land Rover Range HSE Westminster",
    price: 56,
    rating: 4.7,
    reviewsCount: 565,
    mileage: "6786",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new", "used"],
  },
  {
    id: 11,
    featured: true,
    image: "/images/listing/10.jpg",
    photosCount: 55,
    videosCount: 3,
    title: "Bentley Bentayga V8 - 2023",
    price: 230,
    rating: 4.7,
    reviewsCount: 323,
    mileage: "7866",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["used", "new"],
  },
  {
    id: 12,
    featured: true,
    image: "/images/listing/1.jpg",
    photosCount: 12,
    videosCount: 3,
    title: "Ferrari 488 Spider Base - 2019",
    price: 478,
    rating: 4.7,
    reviewsCount: 345,
    mileage: "5436",
    fuelType: "Diesel",
    transmission: "Automatic",
    tags: ["new", "used"],
  },
]);

const PopularListings = () => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        speed={1000}
        modules={[Navigation]}
        navigation={{
          nextEl: ".p1-arrow-next",
          prevEl: ".p1-arrow-prev",
        }}
        breakpoints={{
          // breakpoints for responsive design
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {listingCar.map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="car-listing">
                <div className="thumb">
                  {listing.featured ? (
                    <>
                      <div className="tag">FEATURED</div>
                    </>
                  ) : undefined}
                  {!listing.featured ? (
                    <>
                      <div className="tag blue">SPECIAL</div>
                    </>
                  ) : undefined}

                  <Image
                    width={284}
                    height={183}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    priority
                    src={listing.image}
                    alt={listing.title}
                  />
                  <div className="thmb_cntnt2">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a className="text-white" href="#">
                          <span className="flaticon-photo-camera mr3" />{" "}
                          {listing.photosCount}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="text-white" href="#">
                          <span className="flaticon-play-button mr3" />{" "}
                          {listing.videosCount}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="thmb_cntnt3">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-shuffle-arrows" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-heart" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="details">
                  <div className="wrapper">
                    <h5 className="price">${listing.price}</h5>
                    <h6 className="title">
                      <Link href="/listing-single-v1">{listing.title}</Link>
                    </h6>
                    <div className="listign_review">
                      <ul className="mb0">
                        {[...Array(5)].map((_, index) => (
                          <li key={index} className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                        ))}
                        <li className="list-inline-item">
                          <a href="#">{listing.rating}</a>
                        </li>
                        <li className="list-inline-item">
                          ({listing.reviewsCount} reviews)
                        </li>
                      </ul>
                    </div>
                  </div>{" "}
                  <div className="listing_footer">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <span className="flaticon-road-perspective me-2" />
                        {listing.mileage}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gas-station me-2" />
                        {listing.fuelType}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gear me-2" />
                        {listing.transmission}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-none d-sm-block">
        <div className="slider-arrow-center">
          <button className="prev p1-arrow-prev">
            <i className="flaticon-left-arrow"></i>
          </button>
          <button className="next p1-arrow-next">
            <i className="flaticon-right-arrow"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularListings;
