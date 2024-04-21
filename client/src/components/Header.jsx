import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { noteActions, userActions } from "../store/userStore";
import axios from "axios";
import errorNotification from "../utils/notification";

function Header() {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  function handleLogout() {
    axios
      .post("http://localhost:3000/logout")
      .then((response) => {
        if (response.data.message === "Success") {
          dispatch(userActions.logout());
          dispatch(noteActions.setNoteId(undefined));
        } else {
          errorNotification("Failed to logout.");
        }
      })

      .catch((error) => {
        errorNotification(error.message);
      });
  }
  return (
    <header>
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 border-b border-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="lg:flex lg:items-center lg:space-x-10">
              <NavLink
                to=".."
                relative="route"
                className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 transition duration-300"
              >
                Home
              </NavLink>

              <NavLink
                to="aboutus"
                className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 transition duration-300"
              >
                About
              </NavLink>

              {userId && (
                <NavLink
                  to="searchNote"
                  className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 transition duration-300"
                >
                  Search
                </NavLink>
              )}
            </div>

            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
              <div className="flex-shrink-0">
                <img
                  className="w-auto h-8 lg:h-10"
                  src="https://merakiui.com/images/full-logo.svg"
                  alt=""
                />
              </div>
            </div>

            <div className="lg:flex lg:items-center lg:space-x-4">
              {!userId ? (
                <>
                  <NavLink
                    to="register"
                    className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="login"
                    className="text-base font-medium text-indigo-500 bg-stone-100 py-2 px-4 rounded-md  hover:bg-indigo-300 hover:text-stone-100"
                  >
                    Log in
                  </NavLink>
                </>
              ) : (
                <>
                  <button class="relative w-10 h-10 overflow-hidden bg-indigo-300 rounded-full hover:bg-indigo-500 transition duration-300">
                    <NavLink to="/userProfile">
                      <svg
                        class="absolute w-12 h-12 text-white -left-1 top-1/2 transform -translate-y-1/2 hover:text-stone-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </NavLink>
                  </button>

                  <button
                    onClick={handleLogout}
                    type="submit"
                    className="text-base font-medium text-indigo-500 bg-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-stone-100 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
