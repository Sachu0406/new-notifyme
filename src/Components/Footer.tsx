import React from 'react';
import '../assets/Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <span>&copy; {new Date().getFullYear()} NotifyMe</span>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      
      <div className="footer-section social-media">
        <a href="#" className="icon" aria-label="Facebook"></a>
        <a href="#" className="icon" aria-label="Twitter"></a>
        <a href="#" className="icon" aria-label="Instagram"></a>
      </div>
      
      <div className="footer-section">
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
