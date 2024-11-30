import React, { useState } from "react";
import "../assets/Style/Header.scss";
import logo from "/TradeLogo4.png";
import { AiOutlineClose } from "react-icons/ai";
import { TransFormString } from "./Shared/StaticText";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import useIsSmallDevice from "./Shared/IsMobileDevice";
//import { dayMode } from '../assets/Images/dark-mode-night.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsSmallDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <span className="brand" title="Home" onClick={() => navigate(`/`)}>
        <img src={logo} alt="Logo" className="logo" />
        {TransFormString.appName}
      </span>
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {!isMobile && (
          <a
            href=""
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
          >
            <i onClick={toggleMenu}>{isDarkMode ? "Light" : "Dark"} Mode</i>
          </a>
        )}
        <a href="#jobs">Jobs</a>
        <a href="#admissions">Admissions</a>
        <a href="#entrances">Entrances</a>
        <a
          href="https://chat.whatsapp.com/FrOPBIiJ5JZEiL4kvOjvoF"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Whatsapp Group
        </a>
        {isMobile && isMenuOpen && (
          <a
            href=""
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
          >
            <i onClick={toggleMenu}>{isDarkMode ? "Light" : "Dark"} Mode</i>
          </a>
        )}
      </nav>
      <div className={`menu-icon`} onClick={toggleMenu}>
        {!isMenuOpen ? (
          <>
            <span />
            <span />
            <span />
          </>
        ) : (
          <AiOutlineClose size={24} onClick={toggleMenu} />
        )}
      </div>
      {/* <div
        className={`menu-backdrop ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div> */}
    </header>
  );
};

export default Header;
