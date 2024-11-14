import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselData = (props: any) => {
  const { data } = props;
  return (
    <div>
      <Carousel>
        {data.map((listItem: any, index: number) => (
          <Carousel.Item key={index}>
            <img
              src={`${listItem.src}`}
              alt={`${listItem.alt}`}
              style={{
                width: "100%",
                maxHeight: "400px",
                borderRadius: "15px",
              }}
              className="d-block"
            />
            <Carousel.Caption>
              <h3>{listItem.caption.heading}</h3>
              <p>{listItem.caption.subHeading}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselData;
