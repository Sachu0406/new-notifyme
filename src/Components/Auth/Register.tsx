import React, { useState } from "react";
import {
  validateEmail,
  validateEmpty,
  validatePassword,
  validatePhoneNumber,
} from "../Shared/utils";
import { TransFormString } from "../Shared/StaticText";
import useAllDataStore from "../APIStore/Store";

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return TransFormString.required;
  } else if (password !== confirmPassword) {
    return TransFormString.passwordMissMatch;
  }
  return "";
};

const states = ["State1", "State2", "State3"]; // Add your states here

const RegisterForm: React.FC = () => {
  const { RegisterUser } = useAllDataStore();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    dateOfBirth?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    state?: string;
    terms?: string;
  }>({});

  const validateTerms = (value: boolean) => {
    if (!value) {
      return TransFormString.termsNcondition;
    }
    return "";
  };

  const handleBlur = (field: string) => {
    let newErrors = { ...errors };

    switch (field) {
      case "name":
        newErrors.name = validateEmpty(name);
        break;
      case "dateOfBirth":
        newErrors.dateOfBirth = validateEmpty(dateOfBirth);
        break;
      case "email":
        newErrors.email = validateEmail(email);
        break;
      case "phone":
        newErrors.phone = validatePhoneNumber(phone);
        break;
      case "password":
        newErrors.password = validatePassword(password);
        break;
      case "confirmPassword":
        newErrors.confirmPassword = validateConfirmPassword(
          password,
          confirmPassword
        );
        break;
      case "state":
        newErrors.state = !state ? TransFormString.required : "";
        break;
      case "terms":
        newErrors.terms = validateTerms(acceptTerms);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors: {
      name?: string;
      dateOfBirth?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
      state?: string;
      terms?: string;
    } = {
      name: validateEmpty(name),
      dateOfBirth: validateEmpty(dateOfBirth),
      email: validateEmail(email),
      phone: validatePhoneNumber(phone),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      state: !state ? TransFormString?.required : "",
      terms: validateTerms(acceptTerms),
    };

    setErrors(newErrors);
    return (
      Object.keys(newErrors).filter(
        (key) => newErrors[key as keyof typeof newErrors]
      ).length === 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [day, month, year] = dateOfBirth.split("-");
    const dob = `${year}-${month}-${day}`;
    if (validate()) {
      const postObj = {
        name,
        dateOfBirth: dob,
        email,
        phone,
        password,
        state,
        acceptTerms,
      };
      try {
        const response: any = await RegisterUser(postObj);
        if (response.status === "Success") {
          alert("form submitted");
        } else {
          alert("form submition failed");
        }
      } catch (error) {}
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-info ">
      <div style={{ width: "750px" }} className="p-3 bg-light rounded">
        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-12 mb-2 container border border-3 rounded border-info shadow-sm p-2 text-left font-weight-bold d-flex">
              <code>Note:</code>
              <div>
                Password must be at least 8 characters long.
                <br />
                Should have at least one uppercase letter, one number, and one
                special character.
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="d-flex">
                Name: &nbsp;
                {errors.name && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.name}
                  </p>
                )}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleBlur("name");
                }}
                onBlur={() => handleBlur("name")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="dateOfBirth" className="d-flex">
                Date of Birth: &nbsp;
                {errors.dateOfBirth && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.dateOfBirth}
                  </p>
                )}
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  handleBlur("dateOfBirth");
                }}
                onBlur={() => handleBlur("dateOfBirth")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="d-flex">
                Email: &nbsp;
                {errors.email && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.email}
                  </p>
                )}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleBlur("email");
                }}
                onBlur={() => handleBlur("email")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="d-flex">
                Phone Number: &nbsp;
                {errors.phone && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.phone}
                  </p>
                )}
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleBlur("phone");
                }}
                onBlur={() => handleBlur("phone")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="d-flex">
                Password: &nbsp;{" "}
                {errors.password && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.password}
                  </p>
                )}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleBlur("password");
                }}
                onBlur={() => handleBlur("password")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="d-flex">
                Confirm Password: &nbsp;{" "}
                {errors.confirmPassword && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  handleBlur("confirmPassword");
                }}
                onBlur={() => handleBlur("confirmPassword")}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="d-flex">
                State: &nbsp;
                {errors.state && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errors.state}
                  </p>
                )}
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  handleBlur("state");
                }}
                onBlur={() => handleBlur("state")}
                className="form-select"
              >
                <option value="">Select State</option>
                {states.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="acceptTerms">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  handleBlur("terms");
                }}
                onBlur={() => handleBlur("terms")}
              />
              &nbsp; Accept Terms and Conditions &nbsp;
              {errors.terms && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  {errors.terms}
                </p>
              )}
            </label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-success">Register</button>
            <div>
              <a href="/Login" className="me-4">
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
