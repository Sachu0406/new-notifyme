import React from "react";
const PageTitle = ({ data }: any) => {
  return (
    <div className={"mt-2 container bg-light rounded py-3"}>
      <h2>{data}</h2>
    </div>
  );
};

export default PageTitle;
