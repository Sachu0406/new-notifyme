import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import { gridData } from "../Shared/staticData";
import { useNavigate } from "react-router-dom";



const NotificationCards: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleFlip = (id: number) => setFlippedCardId(id);

  const handleUnflip = () => setFlippedCardId(null);

  return (
    <div className={styles.gridContainer}>
      {gridData.map((item) => (
        <div
          key={item.id}
          className={`${styles.gridItem} ${flippedCardId === item.id ? styles.flipped : ""
            }`}
        >
          <div className={styles.front}>
            <h4>{item.title}</h4>
            <p>Application Date: {item.applicationDate}</p>
            <p>Notification Date: {item.notificationDate}</p>
            <button onClick={() => handleFlip(item.id)}>Click Here to Know More</button>
          </div>
          <div className={styles.back}>
            <h4>{item.title}</h4>
            <button onClick={()=>navigate(item.officialWebsite)}> 
                Official Website
            </button>
            <a href={item.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Here
            </a>
            <a href={item.shareLink} target="_blank" rel="noopener noreferrer">
              Share Link
            </a>
            <button onClick={handleUnflip}>Close</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCards;
