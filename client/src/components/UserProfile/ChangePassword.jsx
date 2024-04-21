import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import errorNotification, {
  successNotification,
} from "../../utils/notification";
import { useSelector } from "react-redux";
import axios from "axios";

function ChangePassword() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  function handleCancel() {
    navigate("/userProfile");
  }

  function changePassword(event) {
    event.preventDefault();
    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const reenterNewPassword = event.target.reenterPassword.value;
    if (
      currentPassword === "" ||
      newPassword === "" ||
      reenterNewPassword === ""
    ) {
      errorNotification("Enter password in all input fields.");
    }

    if (newPassword === reenterNewPassword) {
      axios
        .put(
          "http://localhost:3000/changePassword",
          {
            currentPassword,
            newPassword,
            reenterNewPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message === "Success") {
            successNotification("Password has been changed successfully.");
            setTimeout(() => {
              navigate("/userProfile");
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
    } else {
      errorNotification("New password don't match.");
    }
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <ToastContainer newestOnTop closeOnClick position="bottom-right" />
      <h1 className="text-4xl font-medium pb-3">Change password</h1>

      <form className="mt-10" onSubmit={changePassword}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Current Password</p>
            <input
              type="password"
              name="currentPassword"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter current password"
            />
          </label>
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">New Password</p>
            <input
              type="password"
              name="newPassword"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter new password"
            />
          </label>

          <label htmlFor="reEnterPassword">
            <p className="font-medium text-slate-700 pb-2">Re-enter Password</p>
            <input
              type="password"
              name="reenterPassword"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Re-enter new password"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-indigo-500 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            <span>Change password</span>
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
