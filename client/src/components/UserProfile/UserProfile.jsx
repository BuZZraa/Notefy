import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import errorNotification from "../../utils/notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function UserProfile() {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "Loading...",
    lastName: "Loading...",
    email: "Loading...",
    gender: "Loading...",
    dateOfBirth: "01-01-2024"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId === "") {
          errorNotification("User id not set to load profile.");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/getUser",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data) {
          setUserData(response.data.user);
        }
      } catch (error) {
        errorNotification(error.message || "An error occurred!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md px-6 py-8 max-w-md mt-32 mx-auto border border-stone-200">
      <ToastContainer position="bottom-right" closeOnClick />
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">
            First Name:
          </label>
          <p className="text-lg text-stone-600">{" " + userData.firstName}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">
            Last Name:
          </label>
          <p className="text-lg text-stone-600">{userData.lastName}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">
            Date of Birth:
          </label>
          <p className="text-lg text-stone-600">{userData.dateOfBirth}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">Email:</label>
          <p className="text-lg text-stone-600">{userData.email}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">Gender:</label>
          <p className="text-lg text-stone-600">{userData.gender}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">Address:</label>
          <p className="text-lg text-stone-600">{userData.address}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-stone-800 text-lg font-medium">
            Phone Number:
          </label>
          <p className="text-lg text-stone-600">{userData.phoneNumber}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg mr-4 hover:bg-indigo-900"
          onClick={() =>
            navigate("/editProfile", { state: { user: userData } })
          }
        >
          Edit Profile
        </button>
        <button
          className="py-2 px-4 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-200"
          onClick={() => navigate("/changePassword")}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
