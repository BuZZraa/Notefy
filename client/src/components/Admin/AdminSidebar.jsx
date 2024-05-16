import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/usersSlice.js";
import SessionExpiredModal from "../../utils/SessionExpiredModal.jsx";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const user = useSelector((state) => state.user.name);
  const accessToken = useSelector((state) => state.user.token);
  const sessionExpired = useSelector((state) => state.user.sessionExpired);
  const dispatch = useDispatch();

  useEffect(() => {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      dispatch(usersActions.setSessionExpired(true));
    }
  }, [accessToken, sessionExpired]);

  return (
    <aside className="w-1/3 px-6 py-8 bg-indigo-200 md:w-72 rounded-md border border-gray-300 shadow-md">
      <h1 className="text-2xl mb-6 text-gray-800 font-semibold">
        Welcome, {user}
      </h1>

      <nav className="flex flex-col space-y-4">
        <NavLink to="/adminDashboard" className="flex items-center space-x-2 p-2 bg-white text-gray-700 hover:bg-indigo-800 hover:text-white rounded-md">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </NavLink>
        <NavLink to="/users" className="flex items-center space-x-2 p-2 bg-white text-gray-700 hover:bg-indigo-800 hover:text-white rounded-md">
        <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Users</span>
        </NavLink>
        <NavLink className="flex items-center space-x-2 p-2 bg-white text-gray-700 hover:bg-indigo-800 hover:text-white rounded-md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5"
            fill="currentColor"
          >
            <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z"/>
          </svg>
          <span>Notes</span>
        </NavLink>
      </nav>

      {sessionExpired && <SessionExpiredModal />}
    </aside>
  );
}

export default AdminSidebar;
