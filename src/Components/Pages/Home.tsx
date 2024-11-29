import { useState, useEffect } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { GridItem, gridData } from "../Shared/staticData";
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
      const res: any = await getAllNotificationList();
  
      const filteredData: GridItem[] = res
        .filter((item: any) => {
         
          return (
            item?.id &&
            item?.notificationHeader &&
            item?.notificationSubHeader &&
            item?.notificationDate &&
            item?.applyStartDate &&
            item?.applyEndDate &&
            item?.officialWebSite &&
            item?.applicationFee &&
            item?.eligibility &&
            item?.isNewNotification
          );
        })
        .map((item: any) => {
          // Map the data to match the GridItem structure
          return {
            id: item.id,
            notificationHeader: item.notificationHeader,
            notificationSubHeader: item.notificationSubHeader,
            notificationDate: item.notificationDate,
            applyStartDate: item.applyStartDate,
            applyEndDate: item.applyEndDate,
            officialWebSite: item.officialWebSite,
            applicationFee: item.applicationFee,
            eligibility: item.eligibility,
            isNewNotification: item?.isNewNotification || false,
          } as GridItem;
        });
      const newNotifications: GridItem[] = filteredData.filter(
        (item: any) => item.isNewNotification === true
      );
      setAllData(filteredData);
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
