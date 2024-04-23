import { useDispatch } from "react-redux";
import { userActions } from "../store/userStore";
import { noteActions } from "../store/userStore";

export default function SessionExpiredModal() {
  const dispatch = useDispatch()
  function handleModalClose() {
    dispatch(userActions.logout());
    dispatch(userActions.setUser(null));
    dispatch(userActions.setSessionExpired(true))
    dispatch(noteActions.setNoteId(undefined));
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