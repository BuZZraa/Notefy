import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
    
export default function SecureRoute({ element }) {
    const userId = useSelector(state => state.user.userId);

    if (!userId) {
      // Redirect to login page if userId doesn't exist
      return <Navigate to="/login" />;
    }
  
    // Render the original element if userId exists
    return element;
  }