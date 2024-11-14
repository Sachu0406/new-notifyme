import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import bgImage from "../../assets/Images/background.jpg";
import Header from "../Shared/Header";
import CommonDialogue from "../Shared/CommonDialogue";
function FormExample() {
  const [validated, setValidated] = useState(false);
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, updateModalContent] = useState<any>(null);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity()) {
      //event.stopPropagation();
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      console.log(formValues);
      alert("submission Done");
      updateModalContent({
        title: "Delete Confirmation",
        bodyContent: (
          <Form noValidate validated={validated} onSubmit={handleFinalSubmit}>
            <Form.Group
              as={Col}
              controlId="validationCustom03"
              className="mb-2"
            >
              <Form.Label className="mb-0">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                required
                name="phoneNumber"
                maxLength={10}
                minLength={10}
                pattern="[0-9]*"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid WhatsApp number.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        ),
        cancelText: "Cancel",
        acceptText: "Submit",
        handleProceed: async () => {
          try {
            handleFinalSubmit();
            setShowModal(false);
          } catch (error) {
            console.log("error");
          }
        },
        handleClose: () => setShowModal(false),
      });
      setShowModal(true);
      return;
    }
    setValidated(true);
  };

  const handleFinalSubmit = () => {
    alert("Form is submitted");
  };

  const sectionStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "89vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "0.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  return (
    <>
      <Header />
      <div style={sectionStyle}>
        <Card className="shadow-lg m-md-2" style={cardStyle}>
          <div className=" d-block align-items-center">
            <Card.Header>
              <span className="h2 fw-bold mb-0">Login...</span>
            </Card.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Card.Body className="d-flex flex-column">
                <Form.Group
                  as={Col}
                  controlId="validationCustom01"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                  <Form.Control.Feedback type="invalid" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationCustom02"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email id"
                    name="email"
                  />
                  <Form.Control.Feedback type="invalid" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationCustom03"
                  className="mb-2"
                >
                  <Form.Label className="mb-0">Phone Number</Form.Label>
                  <PhoneInput
                    country={"in"}
                    onlyCountries={["in"]}
                    inputProps={{
                      name: "phoneNumber",
                      required: true,
                      className: "form-control",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid WhatsApp number.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="validationCustom033">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    required
                    name="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="31">Select a state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" />
                </Form.Group>
                <Form.Control.Feedback type="invalid" />
                <Form.Group className="my-2">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    //feedback="You must agree before submitting."
                    feedbackType="invalid"
                    name="termsAndConditions"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="mb-1 px-5"
                  variant="dark"
                  size="lg"
                >
                  Login
                </Button>
                <div className="d-block text-center mt-3 px-2">
                  <a className="small text-muted" href="#!">
                    Forgot password?
                  </a>
                  <p className="mb-0 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <a href="#!" style={{ color: "#393f81" }}>
                      Register here
                    </a>
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="text-center">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </Card.Footer>
            </Form>
          </div>
        </Card>
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
}

export default FormExample;
