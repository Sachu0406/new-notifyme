/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import whatsAppLogo from "../assets/Images/whatsapp.svg";
import classes from "../assets/Module/Layout.module.scss";
import { TransFormString } from "./Shared/StaticText";
import useIsSmallDevice from "./Shared/IsMobileDevice";
import CommonDialogue from "./Shared/CommonDialogue";
import { appDisclaimer } from "./Shared/staticData";
interface LayoutProps {
  children: ReactNode;
}

const POPUP_DISMISS_KEY = "popup_dismiss_time";
const POPUP_DURATION = 60 * 60 * 1000;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSmallDevice = useIsSmallDevice();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);
  // Dismiss the popup and store the timestamp
  const dismissPopup = () => {
    localStorage.setItem(POPUP_DISMISS_KEY, Date.now().toString());
    setShowModal(false);
  };
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

  useEffect(() => {
    checkPopupVisibility();
  }, []);
  return (
    <>
      <Header />
      <div className={classes.container__pages}>{children}</div>
      <div
        className="fixed-bottom right-100 p-3"
        style={{
          zIndex: 6,
          left: "initial",
          marginBottom: isSmallDevice ? "35%" : "4%",
        }}
      >
        <a
          href={TransFormString.whatsAppSupportLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={whatsAppLogo}
            width={60}
            alt="Whatsapp"
            style={{ borderRadius: "50%" }}
          />
        </a>
      </div>
      <Footer />
      <ToastContainer
        style={{
          marginTop: "80px",
        }}
      />
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
    </>
  );
};

export default Layout;
