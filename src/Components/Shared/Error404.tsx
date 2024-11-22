import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stateId = searchParams?.get("state") || 0;
  return <div className="text-center">
  Error occured! Click here to &nbsp;
  <a href={`/Home?state=${stateId}`}>Go Home</a> &nbsp; or <a href="#" onClick={()=>navigate(-1)}>Go back</a> 
</div>;
};

export default Error404;
