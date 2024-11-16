import React, { useState } from 'react';
import '../assets/Header.scss';
import logo from '/public/TradeLogo4.png';
import { AiOutlineClose } from 'react-icons/ai';
import { TransFormString } from './Shared/StaticText';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <span className="brand" title='Home'>
        <img src={logo} alt="Logo" className="logo" />
        {TransFormString.appName}
      </span>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="/Home" >Change State</a>
        <a href="#jobs" >Jobs</a>
        <a href="#admissions" >Admissions</a>
        <a href="#entrances" >Entrances</a>
        <a href="#contact" >Contact</a>
      </nav>
      <div className={`menu-icon`} onClick={toggleMenu} >
        {!isMenuOpen ? <>
          <span />
          <span />
          <span />
        </> :
          <AiOutlineClose size={24} onClick={toggleMenu} />}
      </div>
    </header>
  );
};

export default Header;
