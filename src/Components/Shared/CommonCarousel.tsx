import React from "react";
import '../../assets/Style/CarouselSection.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface CarouselSectionProps {
  title: string;
  carouselItems: CarouselItem[];
  viewAllLink?: string;
  itemHeight?: string;
  itemWidth?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  carouselItems,
  viewAllLink = "#view-all",
  itemHeight = "200px",
  itemWidth = "300px",
}) => {
  console.log([...carouselItems], "Sachin")
  return (
    <div className="carousel-section">
      <div className="section-heading">
        <span>{title}</span>
        <a href={viewAllLink} className="view-all-link">
          View All
        </a>
      </div>
      <div className="separator"/>
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {carouselItems.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{ height: itemHeight, width: itemWidth }}
            className="swiper-slide"
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="swiper-slide-image"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
              
              <p className="carousel-item-title">{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="carousel-container">
        {carouselItems.map((item) => (
          <div
            className="carousel-item"
            key={item.id}
            style={{ height: itemHeight, width: itemWidth }}
          >
            {item?.title}
            <img src={item?.image} alt={item?.title} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CarouselSection;
