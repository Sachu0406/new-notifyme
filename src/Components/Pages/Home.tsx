import { useState } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { CarouselItem, gridData } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";

const Home = () => {
  const [pageRefresh] = useState<number>(Math.random());
  const [carouselItems] = useState<CarouselItem[]>([]);
  return (
    <div key={pageRefresh}>
      {<SwiperSection
        title="New Notifications"
        moreInfoText="Swipe Right"
        carouselItems={carouselItems}
      />}
      {<SwiperSection
        title="All Notifications"
        moreInfoText="Scroll Down"
        carouselItems={[]}
      />}
      <NotificationCards
        gridData={gridData}
      />
    </div>
  );
};

export default Home;
