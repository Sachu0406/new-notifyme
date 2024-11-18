import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "../../assets/Modules/HomePage.module.scss";
import { TransFormString } from "../Shared/StaticText";
import useAllDataStore from "../APIStore/Store";
import Button from "react-bootstrap/esm/Button";
import ShareButton from "../Shared/CommonShareIcon";
const NotificationDetailsPage = () => {
  const {
    getAlljobNotificationDetailsById,
    getAllAdmsNotificationDetailsById,
  } = useAllDataStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const notifyId = searchParams.get("notify") || 0;
  const stateId = searchParams.get("state") || 0;
  const [listPage, setListPage] = useState<any>();
  const [showPage, setShowPage] = useState<boolean>(false);
  const [errorPage, setErrorPage] = useState<boolean>(false);

  const modifyTheData = (data: any) => {
    console.log("Sachin prev", data);
    const res = data.map((listItem: any) => ({
      ...listItem,
      active: listItem?.active ? "True" : "False",
      showBadge: listItem?.showBadge ? "True" : "False",
      // applyStartDate: listItem?.applyStartDate
      //   ? new Date(listItem?.applyStartDate).toLocaleDateString("en-GB")
      //   : null,
      // notificationDate: listItem?.notificationDate
      //   ? new Date(listItem?.notificationDate).toLocaleDateString("en-GB")
      //   : null,
      // applyEndDate: listItem?.applyEndDate
      //   ? new Date(listItem?.applyEndDate).toLocaleDateString("en-GB")
      //   : null,
      // examEndDate: listItem?.examEndDate
      //   ? new Date(listItem?.examEndDate).toLocaleDateString("en-GB")
      //   : null,
      // hallTicketDate: listItem?.hallTicketDate
      //   ? new Date(listItem?.hallTicketDate).toLocaleDateString("en-GB")
      //   : null,
    }));
    return res;
  };
  const fetchData = async () => {
    if (window.location.href.includes("jobDetails")) {
      const listData: any = await getAlljobNotificationDetailsById(
        notifyId || ""
      );
      console.log("Sachinnn res", listData);
      //if (listData) setListPage(modifyTheData(listData));
      setListPage(listData);
      setShowPage(true);
    } else if (window.location.href.includes("AdmissionDetails")) {
      const listData: any = await getAllAdmsNotificationDetailsById(
        notifyId || ""
      );
      setListPage(listData);
      setShowPage(true);
    } else if (window.location.href.includes("jobs")) {
      console.log(notifyId, "Sachu othid");
    } else {
      console.log("Do nothing");
    }
  };

  useEffect(() => {
    if (stateId && notifyId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateId, notifyId]);

  return (
    <>
      <div className="container mt-4 rounded bg-light p-3" key={listPage?._id}>
        <div className="d-flex justify-content-between align-items-center m-3">
          <h3>{TransFormString.notificationDetailsHeading}</h3>
          <Button className="bg-info" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i>Back
          </Button>
        </div>
        <div className="d-flex justify-content-between align-items-center m-3">
          <ShareButton />
        </div>
        {showPage && (
          <div
            className={`table-responsive bg-light rounded h-100 overflow-y-scroll ${classes.notificationScroll}`}
          >
            <table className="table table-bordered">
              <thead className="p-3">
                <tr>
                  <th scope="col" className="bg-info rounded text-center w-25">
                    Particulars
                  </th>
                  <th scope="col" className="bg-info text-center rounded w-50">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">Name of Board</td>
                  <td className="text-center">{listPage?.nameOfBoard}</td>
                </tr>
                <tr>
                  <td className="text-center">Name of Exam</td>
                  <td className="text-center">
                    {listPage?.nameOfNotification}
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Conducted by</td>
                  <td className="text-center">{listPage?.conductAuth}</td>
                </tr>
                <tr>
                  <td className="text-center">Apply through us!</td>
                  <td className="text-center">
                    <a
                      href={`${TransFormString.whatsAppApplyLink} ${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      click here
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Vacancies</td>
                  <td className="text-center">{listPage?.numberOfVacancy}</td>
                </tr>
                <tr>
                  <td className="text-center">Name of Posts</td>
                  <td className="text-center">
                    {/* <ul style={{ listStyle: "none" }}>
                      {listPage?.nameOfPost?.map((listItem: string) => (
                        <li>{listItem}</li>
                      ))}
                    </ul> */}
                    {listPage?.nameOfPost}
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Qualification</td>
                  <td className="text-center">{listPage?.qualification}</td>
                </tr>
                <tr>
                  <td className="text-center">Exam Mode</td>
                  <td className="text-center">{listPage?.modeOfExam}</td>
                </tr>
                <tr>
                  <td className="text-center">Exam Level</td>
                  <td className="text-center">{listPage?.examLevel}</td>
                </tr>
                <tr>
                  <td className="text-center">Required</td>
                  <td className="text-center">
                    {/* <ul style={{ listStyle: "none" }}>
                      {listPage?.required?.map((listItem: string) => (
                        <li>{listItem}</li>
                      ))}
                    </ul> */}
                    {listPage?.requiredDoc}
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Notification Date</td>
                  <td className="text-center">{listPage?.notificationDate}</td>
                </tr>
                <tr>
                  <td className="text-center">Official Website</td>
                  <td className="text-center">
                    <a
                      href={listPage?.officialWebSite}
                      target="__blank"
                      title="you will be redirected to external webSite"
                    >
                      Click here
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Apply</td>
                  <td className="text-center">
                    {listPage?.applyStartDate} - {listPage?.applyEndDate}
                    <div>
                      <a
                        href={listPage?.applyLink}
                        target="__blank"
                        title="Link will redirect you to external webSite"
                      >
                        Click here to Apply
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Hall Tickets</td>
                  <td className="text-center">
                    {listPage?.hallTicket}
                    <div>
                      <a
                        href={listPage?.hallTicketLink}
                        target="__blank"
                        title="Link will redirect you to external webSite"
                      >
                        Hall Tickets
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Result</td>
                  <td className="text-center">
                    {listPage?.result}
                    <div>
                      <a
                        href={listPage?.resultLink}
                        target="__blank"
                        title="Link will redirect you to external webSite"
                      >
                        Results
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">Remarks</td>
                  <td className="text-center">{listPage?.remarks}</td>
                </tr>
                <tr>
                  <td className="text-center">Application steps</td>
                  <td className="text-center">
                    <a href="javascript:void(0)">Apply Steps</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {
          <div className="text-center">
            Error occured! Please &nbsp;
            <a href="javascript:void(0)">
              <span onClick={() => window.location.reload()}>
                Reload &nbsp;
              </span>
            </a>
            or &nbsp;
            <a href={`/Home?state=${stateId}`}>Go Home</a>
          </div>
        }
      </div>
    </>
  );
};

export default NotificationDetailsPage;
