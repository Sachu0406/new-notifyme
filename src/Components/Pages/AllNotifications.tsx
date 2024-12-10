import React, { useState } from "react";
import styles from "../../assets/Module/AllNotifications.module.scss";
import ShareButton from "../Shared/CommonShareIcon";
import { Button, Form } from "react-bootstrap";
import { TransFormString } from "../Shared/StaticText";
import { GridItem } from "../Shared/staticData";
import { useNavigate } from "react-router-dom";

interface dataSection {
  gridData: GridItem[];
}

const NotificationCards: React.FC<dataSection> = ({ gridData }) => {
  const navigate = useNavigate();
  const [flippedCardId, setFlippedCardId] = useState<number | string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredData, setFilteredData] = useState<GridItem[]>(gridData);

  const handleFlip = (id: number | string) => navigate(`/Home/${id}`);
  const handleUnflip = () => setFlippedCardId(null);

  const handleSearch = () => {
    const filtered = gridData.filter((item) => {
      const matchesSearchTerm =
        item.notificationHeader
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.notificationSubHeader
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesType = selectedType
        ? item.notificationType === selectedType
        : true;
      return matchesSearchTerm && matchesType;
    });
    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setFilteredData(gridData);
  };

  return (
    <>
      {/* Filter Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
        <Form.Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="me-2"
          style={{ maxWidth: "200px" }}
        >
          <option value="">Notification Type</option>
          <option value="Job">Job</option>
          <option value="Admission">Admission</option>
          <option value="Entrance">Entrance</option>
        </Form.Select>
        <Button variant="primary" onClick={handleSearch} className="me-2">
          Search
        </Button>
        {gridData.length !== filteredData?.length && (
          <Button variant="outline-secondary" onClick={handleClearFilters}>
            Clear
          </Button>
        )}
      </div>

      {/* Grid Section */}
      <div className={styles.gridContainer}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
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
                  <ShareButton notifyId={item?.id} />
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
                  <Button variant="info" className="d-flex align-items-center">
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
          ))
        ) : (
          <p>No notifications found matching the filters.</p>
        )}
      </div>
    </>
  );
};

export default NotificationCards;
