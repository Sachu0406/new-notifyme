import React, { useState, useCallback, useEffect } from "react";
import CommonDataGrid from "../Shared/CommonDataGrid";
import { toast } from "react-toastify";
import PageTitle from "../Shared/PageTitle";
import { TransFormString } from "../Shared/StaticText";
import useAllDataStore from "../APIStore/Store";
import { useNavigate } from "react-router-dom";
import CommonDialogue from "../Shared/CommonDialogue";

const ManageJobsGrid: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);
  const [refresh, setRefresh] = useState<number>(Math.random());
  const {
    allJobNotificationList,
    getAllJobNotificationList,
    deleteJobsNotificationDetailById,
  } = useAllDataStore();

  const fetchData = useCallback(async () => {
    getAllJobNotificationList();
    setRefresh(Math.random());
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/manageJobs/${id}`);
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
              Are you sure you want to delete this job Notification?
            </span>
          </div>
        </div>
      ),
      cancelText: "Cancel",
      acceptText: "Delete",
      handleProceed: async () => {
        try {
          setShowModal(false);
          const res: any = await deleteJobsNotificationDetailById(id);
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
    getAllJobNotificationList();
  }, []);
  const columns = [
    { field: "nameOfBoard", headerName: "Board", width: "150px" },
    {
      field: "nameOfNotification",
      headerName: "Name of Notification",
      width: "200px",
    },
    {
      field: "notificationDate",
      headerName: "Notification Date",
      width: "100px",
    },
    {
      field: "applyStartDate",
      headerName: "Apply Date",
      width: "100px",
    },
    {
      field: "hallTicketDate",
      headerName: "Hall Ticket Date",
      width: "100px",
    },
    {
      field: "examStartDate",
      headerName: "Exam Date",
      width: "100px",
    },
    {
      field: "resultDate",
      headerName: "Result Date",
      width: "100px",
    },
    {
      field: "active",
      headerName: "Is Active",
      width: "100px",
    },
    {
      field: "showBadge",
      headerName: "Badge",
      width: "100px",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: "250px",
      renderCell: (row: any) => (
        <div className="d-flex">
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary me-3"
          >
            {TransFormString.edit}
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger"
          >
            {TransFormString.delete}
          </button>
        </div>
      ),
      filterable: false, // Mark this column as non-filterable
    },
  ];

  return (
    <>
      <div className="container mt-4">
        <PageTitle data={TransFormString.allJobs} />
        <div className="d-flex justify-content-end m-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/manageJobs`)}
          >
            <i className="bi bi-plus-lg"></i> Add Job Notification
          </button>
        </div>
        <CommonDataGrid
          data={allJobNotificationList}
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

export default ManageJobsGrid;
