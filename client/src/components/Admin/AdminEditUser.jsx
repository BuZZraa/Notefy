import AdminSidebar from "./AdminSidebar";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import errorNotification from "../../utils/notification";
import { useSelector } from "react-redux";
import { useState } from "react";
import FormInput from "../Form/FormInput";

function AdminEditUser() {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role)
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  const [formData, setFormData] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    dateOfBirth: userData.dateOfBirth || "",
    email: userData.email || "",
    gender: userData.gender || "", 
    address: userData.address || "",
    phoneNumber: userData.phoneNumber || "",
  });

  function updateProfile(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.userId = userId;
    formData.user = userData._id;
    formData.role = role;

    axios
      .put("http://localhost:3000/editUser", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.message === "Success") {
          navigate("/users");
        }
      })
      .catch((error) => {
        if (error.response) {
          let errorMessage = error.response.data.message;
          errorNotification(errorMessage);
        } else {
          errorNotification(error.message || "An error occurred!");
        }
      });
  }

  function handleCancel() {
    navigate("/users");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ToastContainer position="bottom-right" closeOnClick />
      <AdminSidebar />
      <div className="bg-gray-100 rounded-lg shadow-md px-8 py-6 max-w-md border border-stone-200">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit User Profile</h2>
        <form onSubmit={updateProfile}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              type="text"
              name="firstName"
              placeholder="John"
              defaultValue={formData.firstName}
            />
            <FormInput
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Doe"
              defaultValue={formData.lastName}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              defaultValue={formData.email}
            />
            <FormInput
              label="Date of Birth"
              defaultValue={formData.dateOfBirth}
              type="date"
              name="dateOfBirth"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Address"
              type="text"
              name="address"
              placeholder="15 Wayford Street"
              defaultValue={formData.address}
            />
            <FormInput
              label="Phone number"
              type="number"
              name="phoneNumber"
              pattern="[0-9]{10}"
              placeholder="9812345678"
              defaultValue={formData.phoneNumber}
            />
          </div>
          <div className="mb-6 space-x-4">
            <label className="block text-gray-600">Gender:</label>
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={formData.gender === "Male"}
              onChange={handleInputChange}
            />
            <span className="text-sm font-medium text-gray-800">Male</span>
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
            />
            <span className="text-sm font-medium text-gray-800">Female</span>
            <input
              type="radio"
              value="Others"
              name="gender"
              checked={formData.gender === "Others"}
              onChange={handleInputChange}
            />
            <span className="text-sm font-medium text-gray-800">Others</span>
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
    </main>
  )
}

export default AdminEditUser
