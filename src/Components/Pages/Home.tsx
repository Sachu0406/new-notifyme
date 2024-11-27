import { useState, useEffect } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { gridData } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";
import SwiperCards from "../Shared/SwiperCards";
import useAllDataStore from "../APIStore/Store";

const Home = () => {
  const {getAllNotificationList} = useAllDataStore();
  const [allData, setAllData] = useState<any>([]);
  //const [newNotifyData, setNewNotifyData] = useState<any>();
  async function fetchNotifications(){
    try{
      const res:any = await getAllNotificationList();
      setAllData(res)
    }catch(err){
      console.log(err)
    }
  };
  useEffect (()=>{
    fetchNotifications();
  },[]); 
  
  const [pageRefresh] = useState<number>(Math.random());
  return (
    <div key={pageRefresh}>
      <SwiperCards
        title="New Notifications"
        moreInfoText="Swipe Right"
        carouselItems={gridData}
      />
      {<SwiperSection
        title="All Notifications"
        moreInfoText="Scroll Down"
        carouselItems={allData}
      />}
      <NotificationCards
        gridData={gridData}
      />
    </div>
  );
};

export default Home;
