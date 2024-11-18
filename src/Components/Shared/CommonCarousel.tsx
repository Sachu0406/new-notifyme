import React from "react";
import "./CarouselSection.scss";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface CarouselSectionProps {
  title: string;
  carouselItems: CarouselItem[];
  viewAllLink?: string;
  itemHeight?: string;
  itemWidth?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  carouselItems,
  viewAllLink = "#view-all",
  itemHeight = "200px",
  itemWidth = "300px",
}) => {
  return (
    <div className="carousel-section">
      <div className="section-heading">
        <span>{title}</span>
        <a href={viewAllLink} className="view-all-link">
          View All
        </a>
      </div>
      <div className="separator"></div>
      <div className="carousel-container">
        {carouselItems.map((item) => (
          <div
            className="carousel-item"
            key={item.id}
            style={{ height: itemHeight, width: itemWidth }}
          >
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
