import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import { useNavigate } from "react-router-dom";
import ShareButton from "../Shared/CommonShareIcon";
import { Button } from "react-bootstrap";
import { FaShareAlt } from "react-icons/fa";

interface dataSection {
  gridData: any
}

const NotificationCards: React.FC<dataSection> = ({
  gridData
}) => {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleFlip = (id: number) => setFlippedCardId(id);

  const handleUnflip = () => setFlippedCardId(null);

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
                More details<i className="bi bi-three-dots ms-1" /></Button>
            </div>
          </div>
          <div className={styles.back}>
            <div>
              <h4 className="fw-bold d-flex justify-content-center">{item.title}</h4>
              <h6 className="fw-bold d-flex justify-content-center text-secondary">{item.title}</h6>
            </div>
            <button onClick={() => navigate(item.officialWebsite)}>
              Official Website
            </button>
            <a href={item.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Here
            </a>
            <div className="d-flex justify-content-between">
              <Button
                variant="light"
                onClick={handleUnflip}
                className="d-flex align-items-center">
                Close</Button>
              <Button
                variant="success"
                //onClick={handleShare}
                className="d-flex align-items-center"
              >
                <FaShareAlt className="me-1" /> Share
              </Button>

            </div>
            <button onClick={handleUnflip}></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCards;
