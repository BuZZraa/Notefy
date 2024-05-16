import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function SecureRegistrationAndLogin({element}) {
  const userId = useSelector((state) => state.user.userId)
  const token = useSelector((state) => state.user.token)
  const role = useSelector((state) => state.user.role)

  if(token && userId && role) {
    if(role === "admin") return <Navigate to="/adminDashboard" />
      else if(role === "user") return <Navigate to="/" />
  }
  
  return element;
}

export default SecureRegistrationAndLogin
