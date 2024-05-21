import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import errorNotification, {
  successNotification,
} from "../../utils/notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPasswordActions } from "../../store/forgotPasswordSlice";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    if (email === "") {
      errorNotification("Enter a email to reset password.");
    }

    axios
      .post("http://localhost:3000/forgotPassword", { email })
      .then((response) => {
        if (response.data.message === "Success") {
          successNotification("Code sent to the email successfully!");
          setTimeout(() => {
            dispatch(
              forgotPasswordActions.setVerificationInfo({ email })
            );
            navigate("/enterCode");
          }, 1000);
        }
      })

      .catch((error) => {
        if (error.response) {
          let errorMessage = error.response.data.message;
          errorNotification(errorMessage);
        } else {
          errorNotification(error.message);
        }
      });
  }
  
  return (
    <div className="max-w-lg mx-auto mt-32 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <ToastContainer newestOnTop closeOnClick position="bottom-right" />
      <h1 className="text-4xl font-medium pb-3">Forgot password?</h1>
      <p className="text-slate-500">Fill up the form to reset the password.</p>

      <form className="my-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              id="email"
              name="email"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
          </label>

          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            Send Code
          </button>
          <p className="text-center">
            Not registered yet?
            <Link
              to="/register"
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
