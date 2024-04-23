import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function SecureRegistrationAndLogin({element}) {
  const userId = useSelector((state) => state.user.userId)
  const token = useSelector((state) => state.user.token)

  if(token && userId) {
    return <Navigate to="/" />;
  }
  
  return element;
}

export default SecureRegistrationAndLogin
