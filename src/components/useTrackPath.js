// useTrackPath.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTrackPath = () => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('lastPath', location.pathname);
  }, [location]);
};

export default useTrackPath;