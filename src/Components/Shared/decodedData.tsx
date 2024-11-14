import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { decodedURL } from "./utils"; // adjust the path as necessary

const DecodedData: object = (base64string: string) => {
  const [decodedData, setDecodedData] = useState<object | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const base64Data = params.get(base64string);

    if (base64Data) {
      try {
        const decodedObject = decodedURL(base64Data);
        setDecodedData(decodedObject);
      } catch (error) {
        console.error("Failed to decode Base64 string:", error);
      }
    }
  }, [location]);

  return decodedData;
};

export default DecodedData;
