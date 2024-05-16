import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../store/usersSlice";
import { notesActions } from "../store/notesSlice";
import { forgotPasswordActions } from "../store/forgotPasswordSlice";
import axios from "axios";
import errorNotification from "./notification";

export default function SessionExpiredModal() {
  const accessToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch()
  function handleModalClose() {
    dispatch(usersActions.logout());
    dispatch(notesActions.setNoteId(undefined));
    dispatch(forgotPasswordActions.clearVerificationInfo());

    axios
    .post("http://localhost:3000/logout", {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then((response) => {
      if (response.data.message === "Success") {
        dispatch(usersActions.logout());
        dispatch(notesActions.setNoteId(undefined));
        dispatch(forgotPasswordActions.clearVerificationInfo());
      } else {
        errorNotification("Failed to logout.");
      }
    })
    .catch((error) => {
      errorNotification(error.message || "An error occurred!");
    });
  };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-75">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Session Expired</h2>
          <p className="text-gray-700 mb-4">Your session has expired. Please log in again.</p>
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-xs md:text-base rounded-md bg-indigo-700 text-stone-100 hover:bg-indigo-900 hover:text-stone-200 transition duration-300"
          >    
          Log in     
          </button>
        </div>
      </div>
    );
}