import React, { useCallback, useEffect, useState } from "react";
import { TransFormString } from "../Shared/StaticText";
import { iState } from "../Shared/ObjectModals";
import useAllDataStore from "../APIStore/Store";
import { useSearchParams } from "react-router-dom";
import SelectStateModal from "./SelectStateModal";
import PageTitle from "../Shared/PageTitle";
import { Carousel } from "react-bootstrap";


interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

const Home = () => {
  const [searchParams] = useSearchParams();
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=5');
        const data = await response.json();
        const items = data.products.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.images[0], // Assuming the first image for each product
        }));
        setCarouselItems(items);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>

      <PageTitle data={"Sachin"} />
      <Carousel>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.title}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {showDialogue && <SelectStateModal />}
    </>
  );
};

export default Home;
