import { NavLink } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { noteActions, userActions } from "../store/userStore";
import axios from "axios";
import errorNotification from "../utils/notification";

function Header() {
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  function handleLogout() {
    axios.post("http://localhost:3000/logout")
      .then(response => {
        dispatch(userActions.logout());
        dispatch(noteActions.setNoteId(undefined))
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
                className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
              >
                Home
              </NavLink>

              <NavLink
                to="aboutus"
                className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300"
              >
                About
              </NavLink>
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
              {
         
                !userId ? (
                <>
                  <NavLink
                    to="/"
                    className="text-base font-medium text-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300">        
                    Register
                  </NavLink>

                  <NavLink
                    to="login"
                    className="text-base font-medium text-indigo-500 bg-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-stone-100"
                  >
                    Log in
                  </NavLink>
                </>) : 
                  <button 
                    onClick={handleLogout}
                    type="submit"
                    className="text-base font-medium text-indigo-500 bg-stone-100 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-stone-100"
                  >
                  Logout
                </button>}
            </div>
          </nav>
        </div>
      </div>   
    </header>
  );
}

export default Header;
