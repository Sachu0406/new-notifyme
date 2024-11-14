// useLoader.ts
import { useState, useEffect } from "react";
import { isLoading } from "../APIServices/httpPromise";

export const useLoader = () => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    const interval = setInterval(() => setLoading(isLoading), 100);
    return () => clearInterval(interval);
  }, []);

  return loading;
};
