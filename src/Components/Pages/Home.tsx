/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import SwiperSection from "../Shared/CommonSwiper";
import { appDisclaimer, gridData } from "../Shared/staticData";
import NotificationCards from "./AllNotifications";
import SwiperCards from "../Shared/SwiperCards";
import useAllDataStore from "../APIStore/Store";
import CommonDialogue from "../Shared/CommonDialogue";
import { useNavigate, useParams } from "react-router-dom";
import NotificationDetailsView from "./NotificationDetailsView";
import { TransFormString } from "../Shared/StaticText";

const POPUP_DISMISS_KEY = "popup_dismiss_time";
const POPUP_DURATION = 60 * 60 * 1000;

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
      setAllData(allNotifications);
      setNewNotifyData(newNotifications);
      setPageRefresh(Math.random());
    } catch (err) {
      console.log(err);
    }
  }

  // Check popup visibility based on local storage
  const checkPopupVisibility = () => {
    const lastDismissTime = localStorage.getItem(POPUP_DISMISS_KEY);
    if (
      !lastDismissTime ||
      Date.now() - parseInt(lastDismissTime, 10) > POPUP_DURATION
    ) {
      handlePopupOpen();
    }
  };

  // Dismiss the popup and store the timestamp
  const dismissPopup = () => {
    localStorage.setItem(POPUP_DISMISS_KEY, Date.now().toString());
    setShowModal(false);
  };

  useEffect(() => {
    fetchNotifications();
    checkPopupVisibility();
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

  const handlePopupOpen = () => {
    updateModalContent({
      title: "User Safety Information",
      bodyContent: (
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ul>
            {appDisclaimer?.map((listItems, index) => (
              <li style={{ listStyle: "none", marginBottom: "0" }}>
                <label style={{ fontWeight: "bold" }}>{listItems?.note}:</label>{" "}
                &nbsp;
                <span>{listItems?.info}</span>
                {index !== appDisclaimer?.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      ),
      cancelText: "",
      acceptText: "Close & Continue",
      handleProceed: () => {
        dismissPopup();
        setShowModal(false);
        // updateModalContent({
        //   title: "Success",
        //   bodyContent: "Record deleted from list.",
        //   cancelText: "Close",
        //   handleClose: () => setShowModal(false),
        // });
        // setShowModal(true);
      },
      handleClose: () => setShowModal(false),
    });
    setShowModal(true);
  };

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
