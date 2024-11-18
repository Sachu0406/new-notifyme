import React from "react";
import { useSearchParams } from "react-router-dom";

const Error404 = () => {
  const [searchParams] = useSearchParams();
  const stateId = searchParams.get("state") || 0;
  return <div className="text-center">
  Error occured! Click here to &nbsp;
  <a href={`/Home?state=${stateId}`}>Go Home</a>
</div>;
};

export default Error404;
