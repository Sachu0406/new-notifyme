import React from "react";
import "../../assets/Style/Loader.scss";
import logoPath from "/public/TradeLogo3.png";

const Loader = () => {
  return (
    <div className="spinner-overlay">
      <div style={{ textAlign: "center" }}>
        <img
          src={logoPath}
          alt="Loading..."
        />
        <div className="loading-text">Hang on...❤️</div>
        <div className="progress-bar-container">
          <div className="progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
