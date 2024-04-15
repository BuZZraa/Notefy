import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

export default function SecureForgotPassword({ element }) {
    const code = useSelector(state => state.forgotPassword.code);

    if (!code) {
      return <Navigate to="/forgotPassword" />;
    }
  
    return element;
  }