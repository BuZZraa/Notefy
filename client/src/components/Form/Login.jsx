import noteVector from "../../assets/noteTaking.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import FormInput from "./FormInput";

function Login() {

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    axios
      .post("http://localhost:3000/login", formData)
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/notefy");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex items-center justify-center my-8 space-x-20">
        <div className="w-1/4 h-full p-4">
          <img
            src={noteVector}
            alt="Note Vector"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-white p-8 rounded-md shadow-lg w-1/4">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" name ="email"
              placeholder="john.doe@example.com"
            />
            <FormInput label="Password" type="password" name="password" minLength={8} maxLength={12} />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Forgot your password?{" "}
            <a href="#" className="text-green-600">
              Reset
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;