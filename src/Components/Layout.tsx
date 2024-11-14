import React, { ReactNode } from "react";
import Header from "./Shared/Header";
import classes from "../assets/Modules/Layout.module.scss";
import Footer from "./Shared/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import whatsAppLogo from "../assets/Images/whatsApp.jpeg";
import { TransFormString } from "./Shared/StaticText";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container__pages}>{children}</div>
      <div
        className="fixed-bottom right-100 p-3"
        style={{ zIndex: 6, left: "initial" }}
      >
        <a
          href={TransFormString.whatsAppSupportLink}
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsAppLogo} width={60} alt="Whatsapp" />
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
