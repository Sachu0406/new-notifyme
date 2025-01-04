import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-E914GH5L1B", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

export default usePageTracking;
