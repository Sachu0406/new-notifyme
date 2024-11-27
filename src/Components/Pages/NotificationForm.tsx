import React, { useEffect, useState } from "react";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Shared/PageTitle";

type Question = {
    id: number;
    question: string;
    type: "input" | "radio" | "date" | "dropdown";
    options?: string[];
};

type NotificationFormProps = {
    editData?: Record<number, string>; // Pre-populated data for edit case
};

const NotificationForm: React.FC<NotificationFormProps> = ({ editData }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [previewMode, setPreviewMode] = useState(false);
    const [error, setError] = useState("");

    // Populate the form with editData on component load
    useEffect(() => {
        if (editData) {
            setAnswers(editData);
        }
    }, [editData]);

    const questions: Question[] = [
        { id: 1, question: "Notification Header", type: "input" },
        { id: 2, question: "Notification SubHeader", type: "input" },
        { id: 3, question: "Notification Date?", type: "date" },
        { id: 4, question: "Application Start Date", type: "date" },
        { id: 5, question: "Application End Date", type: "date" },
        { id: 6, question: "Application Fee", type: "input" },
        { id: 7, question: "Official Website", type: "input" },
        { id: 8, question: "Eligibility", type: "input" },
        { id: 9, question: "Is New Notification", type: "radio", options: ["Yes", "No"] },
        { id: 10, question: "Select State", type: "dropdown", options: ["USA", "India", "Other"] },
        { id: 11, question: "Notification Type", type: "dropdown", options: ["Job", "Admission", "Entrance"] },
    ];

    const handleAnswerChange = (id: number, value: string) => {
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

    const handleSubmit = () => {
        const formattedAnswers = { ...answers };
        // Format all date answers to dd/mm/yyyy
        questions
            .filter((q) => q.type === "date")
            .forEach((q) => {
                if (formattedAnswers[q.id]) {
                    formattedAnswers[q.id] = formatDate(formattedAnswers[q.id]);
                }
            });

        console.log("Submitted Data:", formattedAnswers);
        toast.success("Form submitted successfully!");
    };

    const renderQuestion = (question: Question) => {
        switch (question.type) {
            case "input":
                return (
                    <Form.Control
                        type="text"
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
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
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
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
            <Container style={{ padding: "20px", maxWidth: "600px", background: "white", borderRadius: "10px", boxShadow: "0 2px 4px rgb(10, 10, 10)", color: "black" }}>
                <ToastContainer />
                {!previewMode ? (
                    <>
                        <Row>
                            <Col>
                                <h6 style={{ display: "flex", justifyContent: "flex-end" }}>
                                    Question {currentQuestionIndex + 1}/{questions.length}
                                </h6>
                                <p className="text-capitalize font-weight-normal fs-5" style={{ marginBottom: "0px" }}>{questions[currentQuestionIndex].question}&nbsp;<span style={{ color: "red" }}>*</span></p>
                                <Form>{renderQuestion(questions[currentQuestionIndex])}</Form>
                            </Col>
                        </Row>
                        {error && <Alert variant="danger" className="mt-1">{error}</Alert>}
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
                                    <strong>{question.question}</strong>: {answers[question.id] || "Not answered"}
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
        </>
    );
};

export default NotificationForm;
