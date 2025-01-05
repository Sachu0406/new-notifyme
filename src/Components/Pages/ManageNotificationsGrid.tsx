/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
import CommonDataGrid from "../Shared/CommonDataGrid";
import { toast } from "react-toastify";
import PageTitle from "../Shared/PageTitle";
import { TransFormString } from "../Shared/StaticText";
import useAllDataStore from "../APIStore/Store";
import { useNavigate } from "react-router-dom";
import CommonDialogue from "../Shared/CommonDialogue";
import { gridData, users } from "../Shared/staticData";

const ManageNotificationsGrid: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const user = searchParams?.get("user");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);
  const [refresh, setRefresh] = useState<number>(Math.random());
  const {
    getAllNotificationList,
    allNotificationList,
    deleteAllNotificationDetailByIdAPI,
    updateAllNotificationDetailByIdAPI,
  } = useAllDataStore();

  const fetchData = useCallback(async () => {
    getAllNotificationList();
    setRefresh(Math.random());
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/editNotification/${id}`);
  };

  const handleDelete = async (id: string) => {
    updateModalContent({
      title: "Delete Confirmation",
      bodyContent: (
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <i
              className="bi bi-info-circle-fill"
              style={{ fontSize: "2.5rem" }}
            ></i>
          </div>
          <div className="ps-3">
            <span style={{ fontSize: "1.2rem", color: "black" }}>
              Are you sure you want to delete this Notification?
            </span>
          </div>
        </div>
      ),
      cancelText: "Cancel",
      acceptText: "Delete",
      handleProceed: async () => {
        try {
          setShowModal(false);
          const res: any = await deleteAllNotificationDetailByIdAPI(id);
          if (res.status === "Success") {
            //toast.success(`Successfully deleted`);
            updateModalContent({
              title: "Success",
              bodyContent: "Record deleted from list.",
              cancelText: "Close",
              handleClose: () => setShowModal(false),
            });
            setShowModal(true);
            fetchData();
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      handleClose: () => setShowModal(false),
    });
    setShowModal(true);
  };
  useEffect(() => {
    getAllNotificationList();
  }, []);
  const columns: any = [
    {
      field: "notificationHeader",
      headerName: "Notification Header",
      width: "150px",
      filterable: true,
    },
    {
      field: "notificationSubHeader",
      headerName: "Notification Sub Header",
      width: "200px",
      filterable: true,
    },
    {
      field: "notificationDate",
      headerName: "Notification Date",
      width: "100px",
      filterable: true,
    },
    {
      field: "applyStartDate",
      headerName: "Apply Start Date",
      width: "100px",
      filterable: true,
    },
    {
      field: "applyEndDate",
      headerName: "Apply End Date",
      width: "100px",
      filterable: true,
    },
    {
      field: "applicationFee",
      headerName: "Application Fee",
      width: "100px",
      filterable: true,
    },
    {
      field: "officialWebSite",
      headerName: "Official Website",
      width: "100px",
      filterable: true,
    },
    {
      field: "eligibility",
      headerName: "Eligibilty",
      width: "100px",
      filterable: true,
    },
    {
      field: "newNotify",
      headerName: "New Notification",
      width: "100px",
      filterable: true,
    },
    {
      field: "stateName",
      headerName: "State",
      width: "100px",
      filterable: true,
    },
    {
      field: "notificationType",
      headerName: "Notification Type",
      width: "100px",
      filterable: true,
    },
  ];

  const handleMarkInActive = async (id: string) => {
    updateModalContent({
      title: "Are you sure?",
      bodyContent: (
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <i
              className="bi bi-info-circle-fill"
              style={{ fontSize: "2.5rem" }}
            ></i>
          </div>
          <div className="ps-3">
            <span style={{ fontSize: "1.2rem", color: "black" }}>
              Are you sure you want to mark this Notification as InActive?
            </span>
          </div>
        </div>
      ),
      cancelText: "Cancel",
      acceptText: "Mark Inactive",
      handleProceed: async () => {
        try {
          setShowModal(false);
          let editObject = allNotificationList?.find(
            (listItem: any) => listItem?._id === id
          );
          editObject = { ...editObject, isNewNotification: false };
          const res: any = await updateAllNotificationDetailByIdAPI(
            id,
            editObject
          );
          if (res.status === "Success") {
            //toast.success(`Successfully deleted`);
            updateModalContent({
              title: "Success",
              bodyContent: "Record marked as InActive.",
              cancelText: "Close",
              handleClose: () => setShowModal(false),
            });
            setShowModal(true);
            fetchData();
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      handleClose: () => setShowModal(false),
    });
    setShowModal(true);
  };

  if (user) {
    if (users?.includes(user)) {
      columns.push({
        field: "actions",
        headerName: "Actions",
        width: "300px",
        filterable: false, // Mark this column as non-filterable
        renderCell: (row: any) => (
          <div className="d-flex space-between">
            <button
              onClick={() => handleEdit(row._id)}
              className="btn btn-primary me-3"
            >
              {TransFormString.edit}
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              className="btn btn-danger me-3"
            >
              {TransFormString.delete}
            </button>
            {row?.isNewNotification && (
              <button
                onClick={() => handleMarkInActive(row._id)}
                className="btn btn-info"
              >
                Inactive
              </button>
            )}
          </div>
        ),
      });
    }
  }
  return (
    <>
      <div className="container mt-4">
        <PageTitle data={TransFormString.allJobs} />
        <div className="d-flex justify-content-end m-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/addNewNotification`)}
          >
            <i className="bi bi-plus-lg"></i> Add New Notification
          </button>
        </div>
        <CommonDataGrid
          data={allNotificationList?.reverse() || gridData}
          rowsPerPage={10}
          columns={columns}
          fetchData={fetchData}
          gridFilters={true}
          key={refresh}
        />
      </div>
      {modalContent && (
        <CommonDialogue
          title={modalContent?.title}
          dialogueShow={showModal}
          handleClose={modalContent?.handleClose}
          bodyContent={modalContent?.bodyContent}
          cancelText={modalContent?.cancelText}
          acceptText={modalContent?.acceptText}
          handleProceed={modalContent.handleProceed}
        />
      )}
    </>
  );
};

export default ManageNotificationsGrid;
