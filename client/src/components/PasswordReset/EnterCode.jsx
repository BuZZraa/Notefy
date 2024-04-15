import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import errorNotification, { successNotification } from "../../utils/notification";
import { useNavigate } from "react-router-dom";
function EnterCode() {
  const validCode = useSelector(state => state.forgotPassword.code)
  const navigate = useNavigate()

  function verifyCode(event) {
    event.preventDefault()
    const code = event.target.code.value;
    if(code === validCode) {
        successNotification("Successfully verified.")
        setTimeout(() => {
            navigate("/resetPassword")
        }, 1000)
    }

    else {
        errorNotification("Enter a valid code.")
    }
  }

  return (
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <ToastContainer newestOnTop closeOnClick position="bottom-right"/>
        <h1 class="text-4xl font-medium pb-3">Verify code</h1>
        <p class="text-slate-500">Enter the code received in your mail.</p>

        <form class="my-10" onSubmit={verifyCode}>
            <div class="flex flex-col space-y-5">
                <label for="email">
                    <p class="font-medium text-slate-700 pb-2">Code</p>
                    <input name="code" type="number" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="123456" />
                </label>
               
                <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    Verify
                </button>           
            </div>
        </form>
    </div>
  )
}

export default EnterCode;