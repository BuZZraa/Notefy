import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import errorNotification from "../../utils/notification.js";

function AdminHome() {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.user.token);
  const [totalCount, setTotalUsers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId) {
          errorNotification("User ID not set to retrieve data.");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/dashboardData",
          { userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data) {
          setTotalUsers(response.data.count);
        }
      } catch (error) {
        errorNotification(error.message || "An error occurred.");
      }
    }

    fetchData();
  }, [userId, accessToken]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 border border-indigo-200 rounded-md shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Total Users</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalCount.usersCount}</p>
        </div>
        <div className="bg-gray-50 border border-indigo-200 rounded-md shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Total Notes</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalCount.notesCount}</p>
        </div>
        <div className="bg-gray-50 border border-indigo-200 rounded-md shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Total Tokens</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalCount.tokensCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
