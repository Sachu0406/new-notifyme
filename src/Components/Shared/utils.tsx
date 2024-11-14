import { GenericObject } from "./ObjectModals";
import { TransFormString } from "./StaticText";

export const removeFalsyElement = (object: GenericObject) => {
  const newObject: GenericObject = {};
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      newObject[key] = object[key];
    }
  });
  return newObject;
};

export const encodedURL = (obj: object): string => {
  const jsonString = JSON.stringify(obj);
  return btoa(jsonString);
};

export const decodedURL = (encdURL: string): object => {
  const jsonString = atob(encdURL);
  return JSON.parse(jsonString);
};

export const validateTerms = (value: boolean) => {
  if (!value) {
    return TransFormString.required;
  }
  return "";
};

export const validateEmpty = (value: string) => {
  if (!value?.trim() || value === "null") {
    return TransFormString.required;
  }
  return "";
};

// export const validateNumEmpty = (value: number) => {
//   return value
//     ? isNaN(value)
//       ? "Please enter Number"
//       : ""
//     : TransFormString.required;
// };

export const validateDate = (value: Date | null) => {
  if (!value) {
    return TransFormString.required;
  }
  return null;
};

export const validatePassword = (value: string) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!value) {
    return TransFormString.required;
  } else if (!regex.test(value)) {
    return " ( Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character)";
  }
  return "";
};

export const validateEmail = (value: string) => {
  if (!value) {
    return TransFormString.required;
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    return " (Email address is invalid)";
  }
  return "";
};

export const validateUsername = (value: string) =>
  !value ? "This field is required" : "";
export const validateCity = (value: string) =>
  !value ? "This field is required" : "";
export const validateZip = (value: string) =>
  !value
    ? "This field is required"
    : !/^\d{5}$/.test(value)
    ? "Zip code is invalid"
    : "";
export const validatePhoneNumber = (value: string) => {
  const regex = /^[6-9]\d{9}$/;
  if (!value) {
    return TransFormString.required;
  } else if (!regex.test(value)) {
    return TransFormString.invalidPhoneNumber;
  }
  return "";
};
