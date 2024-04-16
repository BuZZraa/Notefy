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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <PageNotFound />,
      children: [
        { index: true, element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "notefy", element: <SecureRoute element={<Home />} /> },
        { path: "editNote", element: <SecureRoute element={<EditNote />} /> },
        { path: "aboutus", element: <AboutUs />},
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "enterCode", element: <SecureForgotPassword element={<EnterCode />} /> },
        { path: "resetPassword", element: <SecureForgotPassword element={<ResetPassword />} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;