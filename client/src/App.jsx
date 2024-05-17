import RootLayout from "./components/RootLayout.jsx";
import Register from "./components/Form/Register.jsx";
import Login from "./components/Form/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/Error/PageNotFound.jsx";
import SecureRoute from "./utils/SecureRoute.jsx";
import ForgotPassword from "./components/PasswordReset/ForgotPassword.jsx";
import ResetPassword from "./components/PasswordReset/ResetPassword.jsx";
import EnterCode from "./components/PasswordReset/EnterCode.jsx";
import SecureForgotPassword from "./utils/SecureForgotPassword.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Home from "./components/Home.jsx";
import EditNote from "./components/Note/EditNote.jsx";
import SearchNote from "./components/Note/SearchNote.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import EditProfile from "./components/UserProfile/EditProfile.jsx";
import ChangePassword from "./components/UserProfile/ChangePassword.jsx";
import SecureRegistrationAndLogin from "./utils/SecureRegistrationAndLogin.jsx";
import UserManualPage from "./components/UserManualPage.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminViewUsers from "./components/Admin/AdminViewUsers.jsx";
import AdminEditUser from "./components/Admin/AdminEditUser.jsx";
import AdminViewNotes from "./components/Admin/AdminViewNotes.jsx";
import AdminEditNote from "./components/Admin/AdminEditNote.jsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <PageNotFound />,
      children: [
        { index: true, element: <SecureRoute element={<Home />} /> },
        { path:"register", element: <SecureRegistrationAndLogin element={ <Register/> } /> },
        { path: "login", element: <SecureRegistrationAndLogin element={ <Login /> } /> },
        { path: "userProfile", element: <SecureRoute element={<UserProfile />} /> },
        { path: "editProfile", element: <SecureRoute element={<EditProfile />} /> },
        { path: "changePassword", element: <SecureRoute element={<ChangePassword />} /> },
        { path: "editNote", element: <SecureRoute element={<EditNote />} /> },
        { path: "searchNote", element: <SecureRoute element={ <SearchNote />} />},
        { path: "userManual", element: <SecureRoute element={ <UserManualPage />} />},
        { path: "aboutus", element: <AboutUs />},
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "enterCode", element: <SecureForgotPassword element={<EnterCode />} /> },
        { path: "resetPassword", element: <SecureForgotPassword element={<ResetPassword />} /> },
        { path: "adminDashboard", element: <SecureRoute element= {<AdminDashboard />} /> },
        { path: "users", element: <SecureRoute element= {<AdminViewUsers />} /> },
        { path: "editUser", element: <SecureRoute element= {<AdminEditUser />} /> },
        { path: "notes", element: <SecureRoute element= {<AdminViewNotes/>} /> },
        { path: "adminEditNote", element: <SecureRoute element= {<AdminEditNote/>} /> },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;