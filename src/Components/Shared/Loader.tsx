import React from "react";
import "../../assets/CSS/common.css";
const Loader = () => {
  return (
    <div className="spinner-overlay">
      <div style={{ textAlign: "center" }}>
        <img
          src={`${process.env.PUBLIC_URL}/Images/TradeLogo3.png`}
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
