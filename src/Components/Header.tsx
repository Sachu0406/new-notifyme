import React, { useState } from 'react';
import '../assets/Header.scss';
import logo from '../../public/vite.svg'; // Adjust path to your logo file



const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <span className="brand" title='Home'>
        <img src={logo} alt="Logo" className="logo" />
        NotifyMe
      </span>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#jobs" >Jobs</a>
        <a href="#admissions" >Admissions</a>
        <a href="#entrances" >Entrances</a>
        <a href="#termscondition" >Terms & Conditions</a>
        <a href="#contact" >Contact</a>
      </nav>
      <div className={`menu-icon`} onClick={toggleMenu} >
        <span />
        <span />
        <span />
      </div>
    </header>
  );
};

export default Header;
