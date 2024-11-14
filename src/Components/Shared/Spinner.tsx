import { useState, useEffect, CSSProperties } from "react";
import { RingLoader } from "react-spinners";
import "../../assets/CSS/common.css"; // Create and import a CSS file for spinner styles

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = () => {
  const [loaderSize, setLoaderSize] = useState<number>(200);
  const [color, setColor] = useState("blue");
  const colors = ["red", "blue", "yellow", "green"];
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 200);

    return () => clearInterval(colorInterval);
  }, [colors]);
  return (
    <div className="spinner-overlay">
      <RingLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={loaderSize}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;

{
  /* <div>
        <div
          className="spinner-grow spinner-grow-lg text-danger m-2"
          role="status"
        ></div>
        <div
          className="spinner-grow spinner-grow-lg text-warning m-2"
          role="status"
        ></div>
        <div
          className="spinner-grow spinner-grow-lg text-success m-2"
          role="status"
        ></div>
      </div> */
}
