import { useState, CSSProperties, useEffect } from "react";
import * as Spinners from "react-spinners";
import { allSpinners } from "./staticData";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type SpinnerName = keyof typeof Spinners;
//https://www.npmjs.com/package/react-spinners    refer this website for more amazing spinners

const ReactSpinners = () => {
  const [loading, setLoading] = useState(true);
  const [loaderSize, setLoaderSize] = useState<number>(200);
  const [color, setColor] = useState("red");
  const [selectedLoader, setSelectedLoader] =
    useState<SpinnerName>("ClipLoader");
  const colors = ["red", "blue", "green", "purple", "orange"];
  // Get the selected spinner component
  const SpinnerComponent = (Spinners as any)[selectedLoader];
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 1000); // Change color every second

    return () => clearInterval(colorInterval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className="sweet-loading d-flex justify-content-between">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color of the loader"
      />

      <div>
        <input
          type="number"
          value={loaderSize}
          onChange={(e) => setLoaderSize(Number(e.target.value))}
          placeholder="300"
        />
        <select
          value={selectedLoader}
          onChange={(e) => setSelectedLoader(e.target.value as SpinnerName)}
        >
          {allSpinners.map((spinner) => (
            <option key={spinner.id} value={spinner.loader}>
              {spinner.loader}
            </option>
          ))}
        </select>
      </div>
      <div>
        <SpinnerComponent
          color={color}
          loading={loading}
          cssOverride={override}
          size={loaderSize}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default ReactSpinners;
