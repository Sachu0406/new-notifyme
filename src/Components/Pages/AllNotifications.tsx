import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import ShareButton from "../Shared/CommonShareIcon";
import { Button } from "react-bootstrap";
import { TransFormString } from "../Shared/StaticText";
import { GridItem } from "../Shared/staticData";

interface dataSection {
  gridData: [GridItem];
}

const NotificationCards: React.FC<dataSection> = ({ gridData }) => {
  const [flippedCardId, setFlippedCardId] = useState<number | string | null>(
    null
  );
  const handleFlip = (id: number | string) => setFlippedCardId(id);

  const handleUnflip = () => setFlippedCardId(null);

  return (
    <div className={styles.gridContainer}>
      {gridData?.map((item: GridItem) => (
        <div
          key={item.id}
          className={`${styles.gridItem} ${
            flippedCardId === item?.id ? styles.flipped : ""
          }`}
        >
          <div className={styles.front}>
            <div>
              <h5
                className="fw-bold d-flex justify-content-center"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item?.notificationHeader}
              </h5>
              <h6 className="fw-bold d-flex justify-content-center ">
                {item?.notificationSubHeader}
              </h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Notification Date: </p>&nbsp;
              <p className="fw-semibold">{item?.notificationDate}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application Start Date: </p>&nbsp;
              <p className="fw-semibold">{item?.applyStartDate}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application End Date: </p>&nbsp;
              <p className="fw-semibold">{item?.applyEndDate}</p>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <ShareButton />
              <Button
                variant="primary"
                onClick={() => handleFlip(item?.id)}
                className="d-flex align-items-center"
              >
                More details ...
              </Button>
            </div>
          </div>
          <div className={styles.back}>
            <div>
              <h5
                className="fw-bold d-flex justify-content-center "
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.notificationHeader}
              </h5>
              <h6 className="fw-bold d-flex justify-content-center text-secondary">
                {item.notificationSubHeader}
              </h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Eligibility: </p>&nbsp;
              <p className="fw-semibold">{item.eligibility}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Application Fee: </p>&nbsp;
              <p className="fw-semibold">{item?.applicationFee}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="fw-semibold">Official Website: </p>&nbsp;
              <a
                href={item?.officialWebSite || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={"click here to go to Official WebSite"}
                className="link"
              >
                Click here
              </a>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <Button
                variant="light"
                onClick={handleUnflip}
                className="d-flex align-items-center"
              >
                Close
              </Button>
              <Button
                variant="success"
                //onClick={handleApplyThroughUs}
                className="d-flex align-items-center"
              >
                <a
                  href={
                    TransFormString?.whatsAppApplyLink +
                    item?.notificationHeader
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Apply through us
                </a>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCards;
