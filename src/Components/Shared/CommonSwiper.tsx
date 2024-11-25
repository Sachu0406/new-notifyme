
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
  moreInfoTextLink
}) => {
  //const navigate = useNavigate();

  // const handleCardClick = (id: number) => {
  //   navigate(`/details/${id}`); // Navigate to the details page with the item ID
  // };

  return (
    <>
      <div className="carousel-section">
        <div className="section-heading">
          <span>{title}</span>
          <a href={"javascript:void(0)"} className="view-all-link" title="See more">
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
              <img src={item.image} alt={item.title} className="carousel-image" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSection;
