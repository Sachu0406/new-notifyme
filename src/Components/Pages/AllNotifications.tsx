import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import ShareButton from "../Shared/CommonShareIcon";
import { Button } from "react-bootstrap";
import { TransFormString } from "../Shared/StaticText";

interface dataSection {
  gridData: any
}

const NotificationCards: React.FC<dataSection> = ({
  gridData
}) => {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const handleFlip = (id: number) => setFlippedCardId(id);

  const handleUnflip = () => setFlippedCardId(null);
  const handleApplyThroughUs = () => {

  }
  return (
    <div className={styles.gridContainer}>
      {gridData.map((item: any) => (
        <div
          key={item.id}
          className={`${styles.gridItem} ${flippedCardId === item.id ? styles.flipped : ""
            }`}
        >
          <div className={styles.front}>
            <div>
              <h4 className="fw-bold d-flex justify-content-center">{item.title}</h4>
              <h6 className="fw-bold d-flex justify-content-center text-secondary">{item.title}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Notification Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application Start Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application End Date: </p>&nbsp;<p className="fw-semibold">{item.applicationDate}</p>
            </div>
            <div className="d-flex justify-content-between">
              <ShareButton />
              <Button
                variant="primary"
                onClick={() => handleFlip(item.id)}
                className="d-flex align-items-center">
                More details ...</Button>
            </div>
          </div>
          <div className={styles.back}>
            <div>
              <h4 className="fw-bold d-flex justify-content-center">{item.title}</h4>
              <h6 className="fw-bold d-flex justify-content-center text-secondary">{item.title}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Eligibility: </p>&nbsp;<p className="fw-semibold">{item.eligibility}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application Fee: </p>&nbsp;<p className="fw-semibold">500</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Official Website: </p>&nbsp;<p className="fw-semibold"><a href={item?.officialWebsite || "#"} title={"click here to go to Official WebSite"}>Click here</a></p>
            </div>
            <div className="d-flex justify-content-between">
              <Button
                variant="light"
                onClick={handleUnflip}
                className="d-flex align-items-center">
                Close</Button>
              <Button
                variant="success"
                //onClick={handleApplyThroughUs}
                className="d-flex align-items-center"
              >
                <a href={TransFormString?.whatsAppApplyLink + item?.title + item?.officialWebsite} target="_blank" rel="noopener noreferrer">Apply through us</a>
              </Button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCards;
