
import "../../assets/Style/SwiperStyle.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle"; //ref link https://swiperjs.com/react
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { CarouselItem } from "./staticData";

interface CarouselSectionProps {
  title: string;
  carouselItems: CarouselItem[];
  moreInfoText?: string;
  moreInfoTextLink?: string;
}

const SwiperSection: React.FC<CarouselSectionProps> = ({
  title,
  carouselItems,
  moreInfoText,
}) => {

  return (
    <>
      <div className="carousel-section">
        <div className="section-heading">
          <span>{title}</span>
          <a href={""} className="view-all-link" title="To see more" style={{ cursor: "not-allowed" }}>
            {moreInfoText}
          </a>
        </div>
        <div className="separator" />
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Enable autoplay
        loop={true} // Enable infinite loop
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Autoplay, Pagination, Navigation]} // Add the Autoplay module
      >

        {carouselItems.map((item) => (
          <SwiperSlide
            key={item.id}
          //onClick={() => handleCardClick(item.id)}
          >
            <div className="carousel-item">
              <h2>Ts Tet</h2>
              <img src={item.image} alt={item.notificationHeader} className="carousel-image" />
              <h3>{item.notificationHeader}</h3>
              <p>{item.description}</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSection;
