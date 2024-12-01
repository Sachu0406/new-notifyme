/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "../../assets/Style/SwiperStyle.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "../../assets/Module/AllNotifications.module.scss";
import { Button } from "react-bootstrap";
import ShareButton from "../Shared/CommonShareIcon";
import swiperBg from "../../assets/Images/TradeLogohd2.png";
import swiperBg2 from "../../assets/Images/TradeLogohd4.png";
import { TransFormString } from "./StaticText";

interface CarouselSectionProps {
  title: string;
  carouselItems: any;
  moreInfoText?: string;
}

const SwiperCards: React.FC<CarouselSectionProps> = ({
  title,
  carouselItems,
  moreInfoText,
}) => {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null); // Manage Swiper instance

  const handleFlip = (id: number) => {
    setFlippedCardId(id);
    swiperInstance?.autoplay.stop(); // Stop autoplay
  };

  const handleUnflip = () => {
    setFlippedCardId(null);
    swiperInstance?.autoplay.start(); // Resume autoplay
  };

  return (
    <>
      <div className="carousel-section">
        <div className="section-heading">
          <span>{title}</span>
          <a
            href={""}
            className="view-all-link"
            title="To see more"
            style={{ cursor: "not-allowed" }}
          >
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
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        navigation={{ enabled: window.innerWidth > 768 }} // Enable only for larger screens
        //pagination={{ clickable: true, dynamicBullets: window.innerWidth > 768 }}
        onSwiper={(swiper) => setSwiperInstance(swiper)} // Capture Swiper instance
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <div className={styles.gridContainer}>
          {carouselItems.map((item: any) => (
            <SwiperSlide key={item?.id} style={{ minWidth: "290px" }}>
              <div
                className={`${styles.gridItem} ${
                  flippedCardId === item?.id ? styles.flipped : ""
                }`}
              >
                {flippedCardId === item?.id ? (
                  <div
                    className={styles.back}
                    style={{ backgroundImage: `url(${swiperBg2})` }}
                  >
                    <div>
                      <h5
                        className="fw-bold d-flex justify-content-center text-truncate "
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.notificationHeader}
                      </h5>
                      <h6 className="fw-bold d-flex justify-content-center ">
                        {item?.notificationSubHeader}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p className="fw-semibold ">Eligibility: </p>
                      &nbsp;
                      <p className="fw-semibold ">{item?.eligibility}</p>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p className="fw-semibold ">Application Fee: </p>
                      &nbsp;
                      <p className="fw-semibold ">{item?.applicationFee}</p>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p className="fw-semibold ">Official Website:</p>
                      &nbsp;
                      <p className="fw-semibold ">
                        <a
                          href={item?.officialWebSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={"click here to go to Official WebSite"}
                          className="link"
                        >
                          Click here
                        </a>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <Button
                        variant="secondary"
                        onClick={handleUnflip}
                        className="d-flex align-items-center border-white"
                      >
                        Close
                      </Button>
                      <Button
                        variant="info"
                        //onClick={handleShare}
                        className="d-flex align-items-center"
                      >
                        <a
                          href={
                            TransFormString?.whatsAppApplyLink +
                            " " +
                            item?.notificationHeader +
                            " " +
                            window.location.href
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Apply through us
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.front}
                    style={{ backgroundImage: `url(${swiperBg})` }}
                  >
                    <div>
                      <h5
                        className="fw-bold d-flex justify-content-center "
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.notificationHeader}
                      </h5>
                      <h6 className="fw-bold d-flex justify-content-center ">
                        {item?.notificationSubHeader}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-semibold ">Notification Date: </p>
                      &nbsp;
                      <p className="fw-semibold ">{item?.notificationDate}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-semibold ">Application Start Date: </p>
                      &nbsp;
                      <p className="fw-semibold ">{item?.applyStartDate}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-semibold ">Application End Date: </p>
                      &nbsp;
                      <p className="fw-semibold ">{item?.applyEndDate}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <ShareButton />
                      <Button
                        variant="primary"
                        onClick={() => handleFlip(item.id)}
                        className="d-flex align-items-center"
                      >
                        More details ...
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default SwiperCards;
