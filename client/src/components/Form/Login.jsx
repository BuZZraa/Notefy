import noteVector from "../../assets/noteTaking.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorNotification from "../../utils/notification";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userStore";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    axios
      .post("http://localhost:3000/login", formData)
      .then((response) => {
        if (response.data.message === "Success") {
          navigate("/notefy")
          dispatch(userActions.setUser(response.data.user));
        }
      })

      .catch((error) => {
        console.log(error);
        if (error.response) {
          let errorMessage = error.response.data.message;
          errorNotification(errorMessage);
        } else {
          errorNotification(error.message);
        }
      });
  }

  return (
    <div className="flex items-center justify-center my-8 space-x-20">
      <ToastContainer newestOnTop position="bottom-right" closeOnClick/>
      <div className="w-1/4 h-full p-4">
        <img
          src={noteVector}
          alt="Note Vector"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-white p-8 rounded-md shadow-lg w-1/4">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="john.doe@example.com"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            minLength={8}
            maxLength={12}
          />
          <button
            type="submit"
            className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-900"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Forgot your password?{" "}
          <Link to="/forgotPassword" className="text-indigo-800 hover:underline">
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
