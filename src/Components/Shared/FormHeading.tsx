import React from "react";
import classes from "../../assets/Modules/Header.module.scss";
const FormHeading = ({ data }: any) => {
  return <div className={classes.formHeading}>{data}</div>;
};

export default FormHeading;
