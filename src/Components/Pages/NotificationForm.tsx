import React, { useEffect, useState } from "react";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Shared/PageTitle";
import useAllDataStore from "../APIStore/Store";
import CommonDialogue from "../Shared/CommonDialogue";
import { useNavigate } from "react-router-dom";
import { allStates } from "../Shared/staticData";
type Question = {
  id: number;
  question: string;
  type: "input" | "radio" | "date" | "dropdown";
  options?: string[];
  maxLength?: number;
};

type NotificationFormProps = {
  editData?: Record<number, string>; // Pre-populated data for edit case
};

const NotificationForm: React.FC<NotificationFormProps> = ({ editData }) => {
  const navigate = useNavigate();
  const states = allStates.map((listItem:any)=>listItem.stateName)
  const { addNewNotification,} = useAllDataStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [previewMode, setPreviewMode] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);
  const users = ["ns3122", "rs3122"];
  const [error, setError] = useState("");

  // Populate the form with editData on component load
  useEffect(() => {
    if (editData) {
      setAnswers(editData);
    }
  }, [editData]);

  const questions: Question[] = [
    { id: 1, question: "Notification Header", type: "input", maxLength: 22 },
    { id: 2, question: "Notification SubHeader", type: "input", maxLength: 30 },
    { id: 3, question: "Notification Date?", type: "date" },
    { id: 4, question: "Application Start Date", type: "date" },
    { id: 5, question: "Application End Date", type: "date" },
    { id: 6, question: "Application Fee", type: "input", maxLength: 20 },
    { id: 7, question: "Official Website", type: "input", maxLength: 200 },
    { id: 8, question: "Eligibility", type: "input", maxLength: 15 },
    {
      id: 9,
      question: "Is New Notification",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: 10,
      question: "Select State",
      type: "dropdown",
      options: states,
    },
    {
      id: 11,
      question: "Notification Type",
      type: "dropdown",
      options: ["Job", "Admission", "Entrance"],
    },
    { id: 12, question: "Owner Name", type: "input", maxLength: 12 },
  ];

  const handleAnswerChange = (
    id: number,
    value: string,
    maxLength?: number
  ) => {
    if (maxLength && value.length > maxLength) {
      return; // Prevent exceeding maxLength
    }
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const validateAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      setError(`Please answer: "${currentQuestion.question}"`);
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateAnswer()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setError("");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    const formattedAnswers = {
      notificationHeader: answers[1],
      notificationSubHeader: answers[2],
      notificationDate: answers[3] ? formatDate(answers[3]) : null,
      applyStartDate: answers[4] ? formatDate(answers[4]) : null,
      applyEndDate: answers[5] ? formatDate(answers[5]) : null,
      applicationFee: answers[6],
      officialWebSite: answers[7],
      eligibility: answers[8],
      isNewNotification: answers[9] === "Yes",
      stateName: answers[10],
      notificationType: answers[11],
    };
    handleSucceess();
    if (users?.includes(answers[12])) {
      try {
        const res: any = await addNewNotification(formattedAnswers);
        if (res?.status === "Success") {
          console.log(answers, "Submitted Data:", formattedAnswers);
          toast.success("Form submitted successfully!");
          handleSucceess();
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("You are not allowed!");
    }
  };
  const handleSucceess = async () => {
    updateModalContent({
      title: "Success",
      bodyContent: (
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <i
              className="bi bi-check-circle-fill"
              style={{ fontSize: "2.5rem" }}
            ></i>
          </div>
          <div className="ps-3">
            <span style={{ fontSize: "1.2rem", color: "black" }}>
              Notification added successfully.
            </span>
          </div>
        </div>
      ),
      cancelText: "Close",
      acceptText: "Add New",
      handleProceed: ()=>window.location.reload(),
      handleClose: () => navigate("/"),
    });
    setShowModal(true);
  };
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "input":
        return (
          <Form.Control
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) =>
              handleAnswerChange(
                question.id,
                e.target.value,
                question.maxLength
              )
            }
          />
        );
      case "date":
        return (
          <Form.Control
            type="date"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        );
      case "radio":
        return (
          <div>
            {question.options?.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                name={`question-${question.id}`}
                label={option}
                value={option}
                checked={answers[question.id] === option}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                inline
              />
            ))}
          </div>
        );
      case "dropdown":
        return (
          <Form.Select
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          >
            <option value="">Select</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle data={"Create Notification"} />
      <Container
        style={{
          padding: "20px",
          maxWidth: "600px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgb(10, 10, 10)",
          color: "black",
        }}
      >
        {!previewMode ? (
          <>
            <Row>
              <Col>
                <h6 style={{ display: "flex", justifyContent: "flex-end" }}>
                  Question {currentQuestionIndex + 1}/{questions.length}
                </h6>
                <p
                  className="text-capitalize font-weight-normal fs-5"
                  style={{ marginBottom: "0px" }}
                >
                  {questions[currentQuestionIndex].question}&nbsp;
                  <span style={{ color: "red" }}>*</span>
                </p>
                <Form>{renderQuestion(questions[currentQuestionIndex])}</Form>
              </Col>
            </Row>
            {error && (
              <Alert variant="danger" className="mt-1">
                {error}
              </Alert>
            )}
            <div className="mt-4 d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
              >
                Prev
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={() => setPreviewMode(true)}>
                  Preview
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-4">Please Verify</h1>
            <ul className="list-group">
              {questions.map((question) => (
                <li key={question.id} className="list-group-item">
                  <strong>{question.question}</strong>:{" "}
                  {answers[question.id] || "Not answered"}
                </li>
              ))}
            </ul>
            <div className="mt-4 d-flex justify-content-between">
              <Button variant="secondary" onClick={() => setPreviewMode(false)}>
                Back to Edit
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </>
        )}
      </Container>
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

export default NotificationForm;
