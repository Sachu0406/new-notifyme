import "../../assets/Style/Loader.scss";
import { useTheme } from "../../ThemeContext";
import logoPath from "/TradeLogo3.png";
import logoPath2 from "/TradeLogo4.png";

const Loader = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="spinner-overlay">
      <div style={{ textAlign: "center" }}>
        <img src={isDarkMode ? logoPath2 : logoPath} alt="Loading..." />
        <div className="loading-text">Hang on...❤️</div>
        <div className="progress-bar-container">
          <div className="progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
