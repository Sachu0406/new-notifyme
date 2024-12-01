/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { gridData } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";
import SwiperCards from "../Shared/SwiperCards";
import useAllDataStore from "../APIStore/Store";

const Home = () => {
  const { getAllNotificationList } = useAllDataStore();
  const [allData, setAllData] = useState<any>(gridData);
  const [pageRefresh, setPageRefresh] = useState<number>(Math.random());
  const [newNotifyData, setNewNotifyData] = useState<any>(gridData);
  async function fetchNotifications() {
    try {
      const res = await getAllNotificationList();
      const newNotifications: any = res?.map((item: any) =>
        item?.isNewNotification ? item : null
      );
      setAllData(res);
      setNewNotifyData(newNotifications);
      setPageRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div key={pageRefresh}>
      <SwiperCards
        title="New Notifications"
        moreInfoText="Swipe Right"
        carouselItems={newNotifyData}
      />
      {
        <SwiperSection
          title="All Notifications"
          moreInfoText="Scroll Down"
          carouselItems={[]}
        />
      }
      <NotificationCards gridData={allData} />
    </div>
  );
};

export default Home;
