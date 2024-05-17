import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="mb-8" />
      <div className="flex-grow mb-8">
        <Outlet />
      </div>
      <Footer className="mt-8" />
    </div>
  );
}

export default RootLayout;
