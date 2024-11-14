import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import bgImage from "../../assets/Images/background.jpg";
import Header from "../Shared/Header";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
//import { auth, analytics } from "../../FireBase/firebase.config";
import OtpInput from "react18-input-otp";

function FormExample() {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState("");

  // const sendOTP = async () => {
  //   try {
  //     const reCaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       "+919441736903",
  //       reCaptcha
  //     );
  //     console.log("Confirm", confirmation);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    borderRadius: "10px",
  };

  const otpStyle = {
    display: "flex",
    justifyContent: "space-evenly",
  };
  return (
    <>
      <Header />
      <div style={sectionStyle}>
        <Card className="shadow-lg m-3" style={cardStyle}>
          <Card.Header className="text-center">
            <h2 className="fw-bold">Login</h2>
          </Card.Header>
          <Card.Body>
            <Form className="d-flex flex-column align-items-center">
              <Form.Group controlId="phoneNumber" className="mb-3 w-100">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInput
                  country={"in"}
                  onlyCountries={["in"]}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    className: "form-control",
                  }}
                  onChange={(e) => setPhone(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                <Button variant="primary" onClick={() => "sendOTP"}>
                  Send OTP
                </Button>
              </div>

              <div>
                <Form.Group controlId="otp" className="mb-3 w-100">
                  <Form.Label>Enter OTP</Form.Label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    //separator={<span> </span>}
                    isInputNum={true}
                    containerStyle={otpStyle}
                    //isInputSecure //to make invisible
                  />
                </Form.Group>
              </div>

              <div
                id="recaptcha"
                className="d-flex justify-content-center"
              ></div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default FormExample;
