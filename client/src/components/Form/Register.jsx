import noteVector from "../../assets/noteTaking.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import FormInput from "./FormInput";

function Register() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const password = fd.get("password");
    const reenterPassword = fd.get("reenterPassword");

    if (password === reenterPassword) {
      const formData = Object.fromEntries(fd.entries());
      axios
        .post("http://localhost:3000/register", formData)
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Passwords dont match");
    }
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex items-center justify-center my-8 space-x-36">
        <div className="w-1/4 h-full p-4">
          <img
            src={noteVector}
            alt="Note Vector"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-white p-8 rounded-md shadow-lg w-1/4">
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <FormInput label="First Name" type="text" name="firstName" placeholder="John" />
            <FormInput label="Last Name" type="text" name="lastName" placeholder="Doe" />
            <FormInput label="Email" type="email" name="email" placeholder="john.doe@example.com" />
            <FormInput label="Password" type="password" name="password" />
            <FormInput label="Re-enter Password" type="password" name="reenterPassword" />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;