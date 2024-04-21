import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import errorNotification from '../../utils/notification';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const userId = useSelector((state) => state.user.userId)
  const navigate = useNavigate()
  const[userData, setUserData] = useState({
    firstName: "Loading...",
    lastName: "Loading...",
    email: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId === "") {
          errorNotification("User id not set to load profile.");
          return;
        }

        const response = await axios.get("http://localhost:3000/getUser", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        if (response && response.data) {
          setUserData(response.data.user);
        }
      } catch (error) {
        errorNotification(error);
      }
    };

    fetchData();
  })

  return (
    <div className="bg-gray-100 rounded-lg shadow-md px-6 py-8 max-w-md mx-auto border border-stone-200">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-600">First Name:</label>
          <p className="text-lg font-medium">{userData.firstName}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Last Name:</label>
          <p className="text-lg font-medium">{userData.lastName}</p>
        </div>
      </div>
      <div className="mt-6">
        <label className="text-gray-600">Email:</label>
        <p className="text-lg truncate">{userData.email}</p>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg mr-4 hover:bg-indigo-900"
          onClick={() => navigate("/editProfile", { state: { user: userData } })}
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
