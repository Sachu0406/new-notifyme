import React, { useState } from "react";
import "../../assets/Style/SwiperStyle.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "../../assets/Module/AllNotifications.module.scss";
import { Button } from "react-bootstrap";
import ShareButton from "../Shared/CommonShareIcon";
import swiperBg from "../../assets/Images/TradeLogohd2.png"
import swiperBg2 from "../../assets/Images/TradeLogohd1.png"

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
                        href={"javascript:void(0)"}
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
                autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                {carouselItems.map((item: any) => (
                    <SwiperSlide key={item?.id} style={{minWidth:"290px"}}>
                        <div
                            className={`${styles.gridItem} ${flippedCardId === item?.id ? styles.flipped : ""
                                }`}
                                 
                        >
                            {flippedCardId === item?.id ? (
                                <div className={styles.back} style={{backgroundImage:`url(${swiperBg2})`}}>
                                    <div>
                                        <h4 className="fw-bold d-flex justify-content-center">{item.title}</h4>
                                        <h6 className="fw-bold d-flex justify-content-center text-secondary">{item.title}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Eligibility: </p>&nbsp;<p className="fw-semibold">{item.eligibility}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Application Fee: </p>&nbsp;<p className="fw-semibold">500</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Official Website: </p>&nbsp;<p className="fw-semibold"><a href={item?.officialWebsite || "#"} title={"click here to go to Official WebSite"}>Click here</a></p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            variant="light"
                                            onClick={handleUnflip}
                                            className="d-flex align-items-center">
                                            Close</Button>
                                        <Button
                                            variant="success"
                                            //onClick={handleShare}
                                            className="d-flex align-items-center"
                                        >
                                            Apply through us
                                        </Button>

                                    </div>
                                </div>
                            ) : (
                                <div className={styles.front} style={{backgroundImage:`url(${swiperBg})`}}>
                                    <div>
                                        <h4 className="fw-bold d-flex justify-content-center">{item.title}</h4>
                                        <h6 className="fw-bold d-flex justify-content-center text-secondary">{item.title}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Notification Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Application Start Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-semibold">Application End Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <ShareButton />
                                        <Button
                                            variant="primary"
                                            onClick={() => handleFlip(item.id)}
                                            className="d-flex align-items-center">
                                            More details ...</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default SwiperCards;
