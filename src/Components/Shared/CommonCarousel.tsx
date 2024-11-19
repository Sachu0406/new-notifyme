import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../../assets/Style/CarouselSection.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import Autoplay from "swiper"; // Import Autoplay module;
import "swiper/css"; //ref link https://swiperjs.com/get-started
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/autoplay"; // Import autoplay styles;
import { CarouselItem } from "./staticData";

interface CarouselSectionProps {
  title: string;
  carouselItems: CarouselItem[];
  viewAllLink?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  carouselItems,
  viewAllLink = "#view-all",
}) => {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/details/${id}`); // Navigate to the details page with the item ID
  };

  return (
    <div className="carousel-section">
      <div className="section-heading">
        <span>{title}</span>
        <a href={viewAllLink} className="view-all-link">
          View All
        </a>
      </div>
      <div className="separator" />
      <Swiper
        spaceBetween={16}
        //slidesPerView={3}
        grabCursor={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Enable autoplay
        loop={true} // Enable infinite loop
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      //modules={[Autoplay]} // Add the Autoplay module
      >
        {carouselItems.map((item) => (
          <SwiperSlide
            key={item.id}
            className="swiper-slide"
            onClick={() => handleCardClick(item.id)} // Navigate on click
          >
            <div className="card">
              <div className="card-header">{item.title}</div>
              <img
                src={item.image}
                alt={item.title}
                className="card-image"
              />
              <div className="card-description">{item.description}
              Configured slidesPerView for various screen sizes using breakpoints
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSection;
