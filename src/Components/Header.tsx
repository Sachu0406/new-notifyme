import React, { useState } from 'react';
import '../assets/Style/Header.scss';
import logo from '/public/TradeLogo4.png';
import { AiOutlineClose } from 'react-icons/ai';
import { TransFormString } from './Shared/StaticText';
import { useTheme } from '../ThemeContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dayMode } from '../assets/Images/dark-mode-night.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stateId = searchParams.get("state") || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <span className="brand" title='Home' onClick={() => navigate(`/Home?state=${stateId}`)}>
        <img src={logo} alt="Logo" className="logo" />
        {TransFormString.appName}
      </span>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/Home" >Change State</a>
        <a href="#jobs" >Jobs</a>
        <a href="#admissions" >Admissions</a>
        <a href="#entrances" >Entrances</a>
        <a href="#contact" >Contact</a>
        {isMenuOpen && <a href="javascript:void(0)" onClick={toggleTheme}><i onClick={toggleMenu}><img src={dayMode} alt='mode'>{dayMode}{isDarkMode ? "Light" : "Dark"} Mode</img></i></a>}
      </nav>
      <div className={`menu-icon`} onClick={toggleMenu} >
        {!isMenuOpen ? <>
          <span />
          <span />
          <span />
        </> :
          <AiOutlineClose size={24} onClick={toggleMenu} />}
      </div>
      {/* <div
        className={`menu-backdrop ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div> */}
    </header>
  );
};

export default Header;
