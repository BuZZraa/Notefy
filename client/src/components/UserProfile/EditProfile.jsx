import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import errorNotification from '../../utils/notification';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

function EditProfile() {
  const userId = useSelector((state) => state.user.userId)
  const location = useLocation();
  const navigate = useNavigate()
  const userData = location.state?.user; 

  function updateProfile(event) {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;

    if (
        firstName.trim() === "" ||
        lastName.trim() === "" ||
        email.trim() === ""
      ) {
        errorNotification("Enter value for all input fields.");
        return;
      }

    axios
      .put("http://localhost:3000/updateProfile", {firstName, lastName, email}, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        if (response.data.message === "Success") {
            navigate("/userProfile");
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

  function handleCancel() {
    navigate("/userProfile");
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md px-8 py-6 max-w-md mx-auto border border-stone-200">
      <ToastContainer newestOnTop position="bottom-right" />
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
      <form onSubmit={updateProfile}>
        <div className="mb-4">
          <label className="block text-gray-600">First Name:</label>
          <input
            type="text"
            name="firstName"
            className="block w-full px-4 py-2 mt-1 text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={userData.firstName}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className="block w-full px-4 py-2 mt-1 text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={userData.lastName}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            className="block w-full px-4 py-2 mt-1 text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={userData.email}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg mr-4 hover:bg-indigo-900"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
