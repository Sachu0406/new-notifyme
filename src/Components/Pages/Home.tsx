/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { gridData } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";
import SwiperCards from "../Shared/SwiperCards";
import useAllDataStore from "../APIStore/Store";
import CommonDialogue from "../Shared/CommonDialogue";
import { useNavigate, useParams } from "react-router-dom";
import NotificationDetailsView from "./NotificationDetailsView";
import { TransFormString } from "../Shared/StaticText";

const Home = () => {
  const navigate = useNavigate();
  const { getAllNotificationList } = useAllDataStore();
  const { notificationId } = useParams<{ notificationId: string }>();
  const [allData, setAllData] = useState<any>(gridData);
  const [pageRefresh, setPageRefresh] = useState<number>(Math.random());
  const [newNotifyData, setNewNotifyData] = useState<any>(gridData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);

  async function fetchNotifications() {
    try {
      const res = await getAllNotificationList();
      const allNotifications = res?.map((item: any) => ({
        ...item,
        id: item?._id,
      }));
      const newNotifications = allNotifications?.filter(
        (item: any) => item.isNewNotification
      );
      const groupedNotifications = allNotifications
        ?.reverse()
        ?.sort((a: any, b: any) => {
          return b.isNewNotification - a.isNewNotification;
        });

      setAllData(groupedNotifications);
      setNewNotifyData(newNotifications?.reverse());
      setPageRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const showSpecificDetails = () => {
    const showDetailsData = allData?.filter(
      (item: any) => item?.id === notificationId
    )?.[0];
    if (showDetailsData) {
      updateModalContent({
        title: `Details of ${showDetailsData?.notificationHeader}`,
        bodyContent: <NotificationDetailsView listItem={showDetailsData} />,
        cancelText: "Close",
        handleClose: () => {
          navigate("/Home");
          setShowModal(false);
        },
        acceptText: "Apply Through Us",
        handleProceed: () => {
          const url = `${TransFormString?.whatsAppApplyLink}${showDetailsData?.notificationHeader} ${window.location.href}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
      });
      setShowModal(true);
    }
  };
  useEffect(() => {
    if (notificationId) {
      showSpecificDetails();
    }
  }, [notificationId, allData?.length]);

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
      {modalContent && (
        <CommonDialogue
          title={modalContent?.title}
          dialogueShow={showModal}
          handleClose={modalContent?.handleClose}
          bodyContent={modalContent?.bodyContent}
          cancelText={modalContent?.cancelText}
          acceptText={modalContent?.acceptText}
          handleProceed={modalContent.handleProceed}
        />
      )}
    </div>
  );
};

export default Home;
