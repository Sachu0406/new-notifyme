import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import { useNavigate } from "react-router-dom";
import ShareButton from "../Shared/CommonShareIcon";

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
              <button className="btn btn-primary" onClick={() => handleFlip(item.id)}>More details</button>
            </div>
          </div>
          <div className={styles.back}>
            <h4>{item.title}</h4>
            <button onClick={() => navigate(item.officialWebsite)}>
              Official Website
            </button>
            <a href={item.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Here
            </a>
            <ShareButton />
            <button onClick={handleUnflip}>Close</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCards;
