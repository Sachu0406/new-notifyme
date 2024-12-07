import React from "react";

const NotificationDetailsView = (props: any) => {
  const { listItem } = props;
  return (
    <div className="table-responsive bg-light rounded h-100 overflow-auto">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-info">
          <tr>
            <th scope="col" className="rounded w-25">
              Particulars
            </th>
            <th scope="col" className="rounded w-50">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Notification Date :</td>
            <td className="fw-semibold">{listItem?.notificationDate}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Apply Start Date :</td>
            <td className="fw-semibold">{listItem?.applyStartDate}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Apply End Date :</td>
            <td className="fw-semibold">{listItem?.applyEndDate}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Eligibility :</td>
            <td className="fw-semibold">{listItem?.eligibility}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Application Fee :</td>
            <td className="fw-semibold">{listItem?.applicationFee}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Official Website :</td>
            <td className="fw-semibold">
              <a
                href={listItem?.officialWebSite || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Click here to go to Official Website"
                className="link-primary"
              >
                Click here
              </a>
            </td>
          </tr>
          <tr>
            <td className="fw-semibold">Remark :</td>
            <td className="fw-semibold">{listItem?.remark || ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotificationDetailsView;
