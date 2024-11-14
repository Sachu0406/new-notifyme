import React, { useEffect, useRef } from "react";
import "../../assets/CSS/common.css";

interface AutoScrollListProps {
  items: string[];
}

const AutoScrollList: React.FC<AutoScrollListProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const itemHeight = container.firstElementChild?.clientHeight || 0;
      let scrollPosition = 0;
      const scrollInterval = setInterval(() => {
        if (scrollPosition >= container.scrollHeight - container.clientHeight) {
          scrollPosition = 0;
        } else {
          scrollPosition += itemHeight;
        }
        container.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }, 5000); // Adjust the interval as needed

      return () => clearInterval(scrollInterval);
    }
  }, [items]);

  return (
    <div className="autoScrollContainer" ref={containerRef}>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoScrollList;
