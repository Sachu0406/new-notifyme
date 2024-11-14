import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  FormDatePickerField,
  FormInputField,
  FormMaskedInputField,
  FormSelect,
  FormSwitch,
  FormTextArea,
} from "../Shared/FormComponents";
import { TransFormString } from "../Shared/StaticText";
import useAllDataStore from "../APIStore/Store";
import { validateDate, validateEmpty } from "../Shared/utils";
import FormHeading from "../Shared/FormHeading";
import PageTitle from "../Shared/PageTitle";
import { examLevel, onlineOfflineMode } from "../Shared/staticData";
import { useNavigate, useParams } from "react-router-dom";
import CommonDialogue from "../Shared/CommonDialogue";
import ConfirmationPopup from "./ConfirmationPopup";

const ManageJobs: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);
  const {
    stateList,
    getAllStates,
    addNewJobNotification,
    getAlljobNotificationDetailsById,
    updateJobNotificationDetailById,
  } = useAllDataStore();

  const [formValues, setFormValues] = useState<any>({
    nameOfBoard: "",
    notificationDate: "",
    applyStartDate: "",
    applyEndDate: "",
    examStartDate: "",
    examEndDate: "",
    hallTicketDate: "",
    resultDate: "",
    remarks: "",
    active: false,
    showBadge: false,
    stateId: null,
    applicationFee: "",
    conductAuth: "",
    nameOfNotification: "",
    nameOfPost: "",
    numberOfVacancy: "",
    modeOfApplication: "Online",
    modeOfExam: "Online",
    qualification: "",
    examLevel: "State",
    requiredDoc: "",
    officialWebSite: "",
    applyLink: "",
    hallTicketLink: "",
    resultLink: "",
    ageLimit: "",
  });
  const [resetValue] = useState(formValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [refresh, setRefresh] = useState<number>(Math.random());
  useEffect(() => {
    getAllStates();
  }, []);

  const setIntialFormValues = async () => {
    const res: any = await getAlljobNotificationDetailsById(jobId || "");
    if (res) {
      setFormValues({
        ...res,
        stateId: res.stateId?.toString(),
        notificationDate: res?.notificationDate
          ? new Date(res.notificationDate)
          : null,
        hallTicketDate: res.hallTicketDate
          ? new Date(res.hallTicketDate)
          : null,
        examEndDate: res.examEndDate
          ? new Date(res.examEndDate)
          : res.examEndDate,
        applyEndDate: res.applyEndDate ? new Date(res.applyEndDate) : null,
        applyStartDate: res.applyStartDate
          ? new Date(res.applyStartDate)
          : null,
        examStartDate: res.examStartDate ? new Date(res.examStartDate) : null,
      });
    }
    setRefresh(Math.random());
  };
  useEffect(() => {
    if (jobId) {
      setIntialFormValues();
    }
  }, [jobId]);

  const handleFieldChange = (
    name: string,
    value: string | number | boolean | Date
  ) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));

    // Validate only if the field is required
    const isRequired = document
      .querySelector(`[name="${name}"]`)
      ?.hasAttribute("required");
    if (isRequired) {
      setFormErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: validateEmpty(String(value)),
      }));
    } else {
      setFormErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    Object.keys(formValues).forEach((key) => {
      const isRequired = document
        .querySelector(`[name="${key}"]`)
        ?.hasAttribute("required");
      if (isRequired) {
        errors[key] = validateEmpty(String(formValues[key]));
      }
    });

    !formValues?.notificationDate
      ? setFormErrors({
          ...errors,
          notificationDate: "this feild is required",
        })
      : setFormErrors({
          ...errors,
          notificationDate: "",
        });

    const hasErrors = Object.values(errors).some((error) => !!error);
    if (!hasErrors) {
      const postObj = {
        active: formValues.active || false,
        ageLimit: formValues.ageLimit?.trim(),
        applyStartDate: formValues.applyStartDate || null,
        applyEndDate: formValues.applyEndDate || null,
        applyLink: formValues.applyLink?.trim(),
        applicationFee: formValues.applicationFee?.trim(),
        conductAuth: formValues.conductAuth?.trim(),
        examLevel: formValues.examLevel?.trim(),
        examStartDate: formValues.examStartDate || null,
        examEndDate: formValues.examEndDate || null,
        hallTicketDate: formValues.hallTicketDate || null,
        hallTicketLink: formValues.hallTicketLink?.trim(),
        modeOfApplication: formValues.modeOfApplication?.trim(),
        modeOfExam: formValues.modeOfExam?.trim(),
        nameOfNotification: formValues.nameOfNotification?.trim(),
        nameOfBoard: formValues?.nameOfBoard?.trim(),
        notificationDate: formValues.notificationDate || null,
        nameOfPost: formValues.nameOfPost,
        numberOfVacancy: formValues.numberOfVacancy?.trim(),
        officialWebSite: formValues.officialWebSite?.trim(),
        qualification: formValues.qualification?.trim(),
        resultLink: formValues.resultLink?.trim(),
        requiredDoc: formValues.requiredDoc,
        resultDate: formValues.resultDate?.trim(),
        remarks: formValues.remarks?.trim(),
        showBadge: formValues.showBadge || false,
        stateId: formValues?.stateId,
        stateName: stateList?.find((e) => {
          return e.stateId == formValues?.stateId;
        })?.stateName,
      };
      updateModalContent({
        title: "Please Confirm!",
        bodyContent: <ConfirmationPopup pageProps={postObj} />,
        cancelText: "Edit",
        acceptText: "confirm & Proceed",
        dSize: "xl",
        handleProceed: async () => {
          try {
            setShowModal(false);
            let response: any;
            if (jobId) {
              response = await updateJobNotificationDetailById(jobId, postObj);
            } else {
              response = await addNewJobNotification(postObj);
            }
            if (response?.status === "Success") {
              if (jobId) {
                updateModalContent({
                  title: "Success",
                  bodyContent: "Job Notification Updated successfully.",
                  cancelText: "Close",
                  handleClose: () => navigate("/manageJobsGrid"),
                });
                setShowModal(true);
              } else {
                updateModalContent({
                  title: "Success",
                  bodyContent: "Job Notification added successfully.",
                  cancelText: "Close",
                  acceptText: "Add New Record",
                  handleProceed: () => {
                    setFormValues(resetValue);
                    setRefresh(Math.random());
                    setFormErrors({});
                    setShowModal(false);
                  },
                  handleClose: () => navigate("/manageJobsGrid"),
                });
                setShowModal(true);
                //toast.success("Job Notification added successfully");
              }
            } else {
              toast.error(response?.message);
            }
          } catch (error) {
            toast.error("Server error occured! please retry.");
          }
        },
        handleClose: () => setShowModal(false),
      });
      setShowModal(true);
    } else {
      toast.error("Please fill all the required (* marked) fields!");
    }
  };
  const handleReset = () => {
    if (jobId) {
      setIntialFormValues();
      setFormErrors({});
    } else {
      setFormValues(resetValue);
      setFormErrors({});
      setRefresh(Math.random());
    }
  };

  return (
    <>
      <PageTitle
        data={
          jobId
            ? TransFormString.updateJobNotification
            : TransFormString.addNewJobNotification
        }
      />
      <div className="container mb-4 p-4">
        <form
          className="row bg-light"
          onSubmit={handleSubmit}
          key={refresh}
          noValidate
        >
          <FormHeading data={TransFormString.formHeading} />
          <div className="col-md-3">
            <FormSelect
              name="stateId"
              label={TransFormString.state}
              value={formValues.stateId}
              fieldId={"stateId"}
              fieldLabel={"stateName"}
              defaultValue={{ stateName: "Select...", stateId: null }}
              required={true}
              autoFocus={true}
              validator={validateEmpty}
              options={stateList}
              onChange={handleFieldChange}
              error={formErrors.stateId}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="nameOfBoard"
              label={TransFormString.nameOfBoard}
              type="text"
              value={formValues.nameOfBoard}
              required={true}
              validator={validateEmpty}
              maxLength={100}
              placeHolder="eg: SSC"
              onChange={handleFieldChange}
              error={formErrors.nameOfBoard}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="nameOfNotification"
              label={TransFormString.nameOfNotification}
              type="text"
              value={formValues.nameOfNotification}
              required={true}
              validator={validateEmpty}
              maxLength={100}
              placeHolder="eg: CGLE"
              onChange={handleFieldChange}
              error={formErrors.nameOfNotification}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="conductAuth"
              label={TransFormString.conductAuthority}
              type="text"
              value={formValues.conductAuth}
              maxLength={100}
              required={true}
              validator={validateEmpty}
              placeHolder="Conducting Agency/Organization name:"
              onChange={handleFieldChange}
              error={formErrors.conductAuth}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="notificationDate"
              label="Notification Date"
              value={formValues.notificationDate}
              placeHolder="DD/MM/YYYY"
              required={true}
              validator={validateDate}
              onChange={handleFieldChange}
              error={formErrors.notificationDate}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="nameOfPost"
              label={TransFormString.nameOfPost}
              type="text"
              value={formValues.nameOfPost}
              placeHolder="post name"
              maxLength={100}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.nameOfPost}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="numberOfVacancy"
              label={TransFormString.numberOfVacancy}
              type="text"
              value={formValues.numberOfVacancy}
              placeHolder="eg: 23"
              maxLength={3}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.numberOfVacancy}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="ageLimit"
              label={TransFormString.ageLimit}
              type="text"
              value={formValues.ageLimit}
              placeHolder="eg: 21-30"
              maxLength={20}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.ageLimit}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="qualification"
              label={TransFormString.qualification}
              type="text"
              value={formValues.qualification}
              placeHolder="eg: Degree"
              maxLength={50}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.qualification}
            />
          </div>
          <div className="col-md-3">
            <FormSelect
              name="modeOfApplication"
              label={TransFormString.modeOfApplication}
              fieldId={"value"}
              fieldLabel={"name"}
              options={onlineOfflineMode}
              value={formValues.modeOfApplication}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.modeOfApplication}
            />
          </div>
          <div className="col-md-3">
            <FormSelect
              name="modeOfExam"
              label={TransFormString.modeOfExam}
              fieldId={"value"}
              fieldLabel={"name"}
              options={onlineOfflineMode}
              value={formValues.modeOfExam}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.modeOfExam}
            />
          </div>
          <div className="col-md-3">
            <FormSelect
              name="examLevel"
              label={TransFormString.examLevel}
              value={formValues.examLevel}
              fieldId="value"
              fieldLabel="name"
              options={examLevel}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.examLevel}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="requiredDoc"
              label={TransFormString.certificateRequired}
              type="text"
              value={formValues.requiredDoc}
              placeHolder="eg: SSC Memo, Inter Memo"
              maxLength={50}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.requiredDoc}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="officialWebSite"
              label={TransFormString.OfficialWebSite}
              type="text"
              value={formValues.officialWebSite}
              placeHolder="eg: www.example.com"
              maxLength={50}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.officialWebSite}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="applyStartDate"
              label={TransFormString.applyStartDate}
              value={formValues.applyStartDate}
              required={true}
              placeHolder="DD/MM/YYYY"
              validator={validateDate}
              onChange={handleFieldChange}
              error={formErrors.applyStartDate}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="applyEndDate"
              label={TransFormString.applyEndDate}
              value={formValues.applyEndDate}
              //required={true}
              placeHolder="DD/MM/YYYY"
              //validator={validateDate}
              onChange={handleFieldChange}
              //error={formErrors.applyEndDate}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="applyLink"
              label={TransFormString.applyLink}
              type="text"
              value={formValues.applyLink}
              placeHolder="eg: www.example.com/apply"
              maxLength={100}
              onChange={handleFieldChange}
              //required={true}
              //validator={validateEmpty}
              //error={formErrors.applyLink}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="hallTicketDate"
              label={TransFormString.hallTicketDate}
              value={formValues.hallTicketDate}
              onChange={handleFieldChange}
              placeHolder="DD/MM/YYYY"
              // required={true}
              // validator={validateDate}
              // error={formErrors.hallTicketDate}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="hallTicketLink"
              label={TransFormString.hallTicketLink}
              type="text"
              value={formValues.hallTicketLink}
              placeHolder="eg: www.example.com/hallticket"
              maxLength={100}
              onChange={handleFieldChange}
              // required={true}
              // validator={validateEmpty}
              // error={formErrors.hallTicketLink}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="examStartDate"
              label={TransFormString.examStartDate}
              value={formValues.examStartDate}
              placeHolder="DD/MM/YYYY"
              onChange={handleFieldChange}
              // required={true}
              // validator={validateDate}
              // error={formErrors.examStartDate}
            />
          </div>
          <div className="col-md-3">
            <FormDatePickerField
              name="examEndDate"
              label={TransFormString.examEndDate}
              value={formValues.examEndDate}
              onChange={handleFieldChange}
              placeHolder="DD/MM/YYYY"
              // required={true}
              // validator={validateDate}
              // error={formErrors.examEndDate}
            />
          </div>

          <div className="col-md-3">
            <FormMaskedInputField
              name="resultDate"
              label={TransFormString.resultDate}
              mask="99/99/9999"
              value={formValues.resultDate}
              placeHolder="DD/MM/YYYY"
              maxLength={10}
              onChange={handleFieldChange}
              // required={true}
              // validator={validateEmpty}
              // error={formErrors.resultDate}
            />
          </div>
          <div className="col-md-3">
            <FormInputField
              name="resultLink"
              label={TransFormString.resultLink}
              type="text"
              value={formValues.resultLink}
              placeHolder="eg: www.example.com/result"
              maxLength={100}
              onChange={handleFieldChange}
              // required={true}
              // validator={validateEmpty}
              // error={formErrors.resultLink}
            />
          </div>
          <div className="col-md-3 pt-md-3">
            <FormSwitch
              name="active"
              label={TransFormString.isActive}
              checked={formValues ? formValues.active : false}
              onChange={handleFieldChange}
            />
            <FormSwitch
              name="showBadge"
              label={TransFormString.showBadge}
              checked={formValues.showBadge}
              onChange={handleFieldChange}
            />
          </div>
          <div className="col-md-6">
            <FormInputField
              name="applicationFee"
              label={TransFormString.applicationFee}
              type="text"
              value={formValues.applicationFee}
              placeHolder="eg: SC,ST : 500rs, BC,OBC,MINORITY : 750rs, Others : 1000rs"
              maxLength={100}
              required={true}
              validator={validateEmpty}
              onChange={handleFieldChange}
              error={formErrors.applicationFee}
            />
          </div>
          <div className="col-md-12">
            <FormTextArea
              name="remarks"
              label={TransFormString.remarks}
              value={formValues.remarks}
              onChange={handleFieldChange}
              placeHolder="Any optional info write here"
              error={formErrors.remarks}
            />
          </div>
          <div className="col-12 d-flex justify-content-end align-items-center me-3 mb-2">
            <button className="btn btn-primary me-2" type="submit">
              {TransFormString.submit}
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/manageJobsGrid")}
            >
              Cancel
            </button>
          </div>
        </form>
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

export default ManageJobs;
