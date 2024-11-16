import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import whatsAppLogo from "../assets/Images/whatsApp.jpeg";
import { TransFormString } from "./Shared/StaticText";
//import { useTheme } from "../ThemeContext";
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
      <div className="container" >
        {/* {isSmallDevice &&
          <div className="form-check form-switch" style={{ margin: "5px", position: "fixed", right: "1px" }}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeSwitch"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label className="form-check-label" htmlFor="themeSwitch">
              {isDarkMode ? "Light" : "Dark"} Mode
            </label>
          </div>
        } */}
        {children}
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
