import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

export default function SecureForgotPassword({ element }) {
    const email = useSelector(state => state.forgotPassword.email);

    if (!email) {
      return <Navigate to="/forgotPassword" />;
    }
  
    return element;
  }