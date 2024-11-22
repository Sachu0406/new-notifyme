import React from 'react';
import '../assets/Style/Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <span>&copy; {new Date().getFullYear()} all rights reserved.</span>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/TermsnCond">Terms & Conditions</a>
      </div>

      <div className="footer-section social-media">
        <a href="https://www.facebook.com/login/" target="/">
          <i className="bi bi-facebook me-2 text-primary fs-6">FaceBook</i>
          
        </a>
        <a
          href="https://www.instagram.com/accounts/login/"
          target="/"
        >
          <i className="bi bi-instagram me-2 text-danger fs-6">Instagram</i>
          
        </a>
        <a href="https://x.com/i/flow/login" target="/">
          <i className="bi bi-twitter me-2 text-primary fs-6">Twitter</i>
           &nbsp; &nbsp;
        </a>
      </div>

      <div className="footer-section">
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
