import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { userActions } from "../store/userStore.js";
import SessionExpiredModal from "./SessionExpiredModal.jsx";

export default function SecureRoute({ element }) {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionExpired = useSelector((state) => state.user.sessionExpired)

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000; 
  
      if (decodedToken.exp < currentTime) {
        dispatch(userActions.setSessionExpired(true))
      }
    }
  }, [accessToken, location]);
  if (!userId || !accessToken) {
    return <Navigate to="/login" />;
  }

  if (sessionExpired) {
    return <SessionExpiredModal />;
  }

  return element;
}
