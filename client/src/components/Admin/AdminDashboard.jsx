import AdminSidebar from "./AdminSidebar.jsx";
import AdminHome from "./AdminHome.jsx";
import { ToastContainer } from "react-toastify";

function AdminDashboard() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <ToastContainer position="bottom-right" closeOnClick />
      <AdminSidebar />
      <AdminHome />
    </main>
  );
}

export default AdminDashboard;
