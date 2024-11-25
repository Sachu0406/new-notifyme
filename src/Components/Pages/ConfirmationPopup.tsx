import { useState } from "react";
import classes from "../../assets/Modules/HomePage.module.scss";

const ConfirmationPopup = (props: any) => {
  const { pageProps } = props;
  const [listPageData] = useState<any>(pageProps);
  const convertDatetoLocalString = (dateString: any) => {
    if (dateString) {
      return new Date(dateString).toLocaleDateString("en-GB");
    }
    return "-";
  };
  return (
    <>
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
              <td className="text-center">Active</td>
              <td className="text-center">{listPageData?.active || "false"}</td>
            </tr>
            <tr>
              <td className="text-center">Age Limit</td>
              <td className="text-center">{listPageData?.ageLimit || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Apply Start Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.applyStartDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Apply End Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.applyEndDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Apply Link</td>
              <td className="text-center">{listPageData?.applyLink || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Application Fee</td>
              <td className="text-center">
                {listPageData?.applicationFee || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Counduct Authority</td>
              <td className="text-center">
                {listPageData?.conductAuth || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Exam Level</td>
              <td className="text-center">{listPageData?.examLevel || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Exam Start Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.examStartDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Exam End Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.examEndDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Hall Ticket Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.hallTicketDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Hall Ticket Link</td>
              <td className="text-center">
                {listPageData?.hallTicketLink || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Mode of Application</td>
              <td className="text-center">
                {listPageData?.modeOfApplication || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Mode of Exam</td>
              <td className="text-center">{listPageData?.modeOfExam || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Name of Notification</td>
              <td className="text-center">
                {listPageData?.nameOfNotification || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Name of Board</td>
              <td className="text-center">
                {listPageData?.nameOfBoard || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Notification Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.notificationDate) ||
                  "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Name of Post</td>
              <td className="text-center">{listPageData?.nameOfPost || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Number of vacancy</td>
              <td className="text-center">
                {listPageData?.numberOfVacancy || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Official Website</td>
              <td className="text-center">
                {listPageData?.officialWebSite || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Qualification</td>
              <td className="text-center">
                {listPageData?.qualification || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Result Link</td>
              <td className="text-center">{listPageData?.resultLink || "-"}</td>
            </tr>
            <tr>
              <td className="text-center">Required Document</td>
              <td className="text-center">
                {listPageData?.requiredDoc || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Result Date</td>
              <td className="text-center">
                {convertDatetoLocalString(listPageData?.resultDate) || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-center">Remarks</td>
              <td className="text-center">{listPageData?.remarks}</td>
            </tr>
            <tr>
              <td className="text-center">Show Badge</td>
              <td className="text-center">
                {listPageData?.showBadge || "false"}
              </td>
            </tr>
            <tr>
              <td className="text-center">State</td>
              <td className="text-center">
                {listPageData?.stateName || "false"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConfirmationPopup;
