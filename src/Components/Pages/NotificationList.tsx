import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransFormString } from "../Shared/StaticText";
import classes from "../../assets/Module/AllNotifications.module.scss";
import { Accordion, useAccordionButton, Card, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useAllDataStore from "../APIStore/Store";

const CustomToggle: React.FC<{
  children: React.ReactNode;
  eventKey: string;
  activeEventKey: string | null;
  setActiveEventKey: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ children, eventKey, activeEventKey, setActiveEventKey }) => {
  const isExpanded = activeEventKey === eventKey;

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setActiveEventKey(isExpanded ? null : eventKey);
  });

  return (
    <button
      type="button"
      className={`accordion-button ${classes.homepage} ${
        isExpanded ? "" : "collapsed"
      } rounded`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};

const NotificationList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stateId = searchParams.get("state") || "0";
  const [listData, setListData] = useState<any[]>([]);
  const { getAllJobNotificationByState, getAllAdmsNotificationByState } =
    useAllDataStore();
  const [activeEventKey, setActiveEventKey] = useState<string | null>(null);
  const dataFetch = async () => {
    if (window.location.href.includes("jobs")) {
      const res: any = await getAllJobNotificationByState(stateId);
      setListData(res);
    } else if (window.location.href.includes("admissions")) {
      const res: any = await getAllAdmsNotificationByState(stateId);
      setListData(res);
    }
  };
  useEffect(() => {
    dataFetch();
  }, [stateId]);

  const detailPageRoute = (notifyId: number | string) => {
    if (window.location.href.includes("jobs")) {
      navigate(`/jobDetails?state=${stateId}&notify=${notifyId}`);
    } else if (window.location.href.includes("admissions")) {
      navigate(`/AdmissionDetails?state=${stateId}&notify=${notifyId}`);
    } else {
      navigate(`/otherDetails?state=${stateId}&notify=${notifyId}`);
    }
    return new Date();
  };

  return (
    <>
      {/* <div className="container mt-1">
        <CarouselData data={carouselData1} />
      </div> */}
      <div className={`container mt-4 mb-1 p-1 rounded`}>
        <div className="d-flex justify-content-between align-items-center">
          <h3>{TransFormString.allNotifications}</h3>
          <Button className="bg-info me-3" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i>Back
          </Button>
        </div>
        <p>
          Click on <code>Know More</code> to find the official Links.
        </p>
        <Accordion
          flush
          className={`mt-4 mb-4 p-1 rounded overflow-y-scroll ${classes.notificationScroll}`}
        >
          {listData?.map((notification: any, index) => (
            <Accordion.Item
              eventKey={index.toString()}
              key={notification.id}
              className="rounded mb-2"
            >
              <Card.Header className="rounded">
                <CustomToggle
                  eventKey={index.toString()}
                  activeEventKey={activeEventKey}
                  setActiveEventKey={setActiveEventKey}
                >
                  {notification.nameOfBoard} &nbsp;{" "}
                  {notification.nameOfNotification}
                  {notification.showBadge && (
                    <span className="badge badge-secondary bg-danger ms-4">
                      New
                    </span>
                  )}
                </CustomToggle>
              </Card.Header>
              <Accordion.Body className="rounded bg-light">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="bg-info rounded text-center">
                          Notification
                        </th>
                        <th scope="col" className="bg-info text-center">
                          Apply
                        </th>
                        <th scope="col" className="bg-info text-center">
                          Hall Tickets
                        </th>
                        <th scope="col" className="bg-info text-center">
                          Exam Date
                        </th>
                        <th scope="col" className="bg-info text-center">
                          Result
                        </th>
                        <th scope="col" className="bg-info text-center rounded">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td align="center">{notification.notificationDate}</td>
                        <td align="center">
                          {notification.applyStartDate} - <br />
                          {notification.applyEndDate}
                        </td>
                        <td align="center">{notification.hallTicketDate}</td>
                        <td align="center">
                          {notification.examStartDate} - <br />
                          {notification.examEndDate}
                        </td>
                        <td align="center">{notification.resultDate}</td>
                        <td align="center">{notification.remarks}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-end w-100">
                  <span
                    onClick={() => detailPageRoute(notification._id)}
                    className="text-primary"
                    style={{ cursor: "pointer", fontWeight: "600" }}
                  >
                    know more...
                  </span>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default NotificationList;
