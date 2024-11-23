import { useCallback, useEffect, useState } from "react";
import { iState } from "../Shared/ObjectModals";
import useAllDataStore from "../APIStore/Store";
import { useSearchParams } from "react-router-dom";
import SelectStateModal from "./SelectStateModal";
import SwiperSection from "../Shared/CommonSwiper";
import { CarouselItem } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [pageRefresh, setPageRefresh] = useState<number>(Math.random());
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const state = searchParams.get("state") || 0;
  const [showDialogue] = useState<boolean>(state ? false : true);
  const { stateList, getAllStates } = useAllDataStore();
  const [currentState, setCurrentState] = useState<iState>({
    districts: [],
    _id: "",
    shortName: "",
    stateName: "",
    stateId: 0,
  });
  const getStates = useCallback(() => {
    if (stateList?.length === 0 && +state !== 0) {
      getAllStates();
    }
  }, [stateList?.length === 0]);

  useEffect(() => {
    if (stateList?.length > 0 && +state !== 0) {
      const matchedState: any = stateList?.find(
        (obj: any) => obj.stateId === +state
      );
      setCurrentState(matchedState);
    }
    getStates();
  }, [stateList, state]);
  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10');
      const data = await response.json();
      const items = data.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        image: item.images[0],
      }));
      setCarouselItems(items);
      setPageRefresh(Math.random());
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };
  useEffect(() => {
    if (state) fetchData();
  }, []);

  return (
    <div key={pageRefresh}>
      { <SwiperSection
        title="New Notifications"
        carouselItems={carouselItems}
      />}
      { <SwiperSection
        title="All Notifications"
        carouselItems={[]}
      />}
      <NotificationCards/>
      {showDialogue && <SelectStateModal />}
    </div>
  );
};

export default Home;
