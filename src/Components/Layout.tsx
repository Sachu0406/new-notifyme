import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import whatsAppLogo from "../assets/Images/whatsapp.svg";
import classes from "../assets/Module/Layout.module.scss";
import { TransFormString } from "./Shared/StaticText";
import useIsSmallDevice from "./Shared/IsMobileDevice";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  //const { isDarkMode, toggleTheme } = useTheme();
  const isSmallDevice = useIsSmallDevice();
  return (
    <>
      <Header />
      <div className={classes.container__pages}>
        {children}
        i need to add QuickLinks here
        </div>
      <div
        className="fixed-bottom right-100 p-3"
        style={{ zIndex: 6, left: "initial", marginBottom: isSmallDevice ? "35%" : "4%" }}
      >
        <a
          href={TransFormString.whatsAppSupportLink}
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsAppLogo} width={60} alt="Whatsapp" style={{ borderRadius: "50%" }} />
        </a>
      </div>
      <Footer />
      <ToastContainer
        style={{
          marginTop: "80px",
        }}
      />
    </>
  );
};

export default Layout;
