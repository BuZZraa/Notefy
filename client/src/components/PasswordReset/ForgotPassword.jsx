import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import errorNotification, { successNotification } from "../../utils/notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPasswordActions } from "../../store/userStore";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    if(email === "") {
        errorNotification("Please enter a email !")
    }

    axios
      .post("http://localhost:3000/forgotPassword", {email: email})
      .then((response) => {
        if (response.data.message === "Success") {
          const code = response.data.code;
          successNotification("Code sent to the email successfully!")      
          setTimeout(() => {
            dispatch(forgotPasswordActions.setVerificationInfo({ code, email }))
            navigate("/enterCode")
          },1000)      
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
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <ToastContainer newestOnTop closeOnClick position="bottom-right"/>
        <h1 class="text-4xl font-medium pb-3">Forgot password?</h1>
        <p class="text-slate-500">Fill up the form to reset the password.</p>

        <form class="my-10" onSubmit={handleSubmit}>
            <div class="flex flex-col space-y-5">
                <label for="email">
                    <p class="font-medium text-slate-700 pb-2">Email address</p>
                    <input name="email" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                </label>
               
                <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    Send Code
                </button>
                <p class="text-center">Not registered yet? 
                    <Link to="/" class="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                        <span>Register now </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                    </Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default ForgotPassword;