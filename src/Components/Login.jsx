import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "./Authentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, handleGoogle_Login, handleGithub_Login } = useContext(AuthContext);

  // ✅ Save logged-in user to your own backend
  const saveUserToDB = (user) => {
    const userData = {
      email: user.email,
      name: user.displayName || "Anonymous",
      role: "student", // Default role
      image: user.photoURL || "",
    };

    axios.post("http://localhost:5050/api/users", userData)
      .then(() => console.log("✅ User saved to DB"))
      .catch((err) => console.error("❌ Failed to save user:", err));
  };

  const handleGoogleLogin = () => {
    handleGoogle_Login()
      .then((result) => {
        saveUserToDB(result.user); // ✅ Save user

        Swal.fire({
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => setError(error.message));
  };

  const handleGithubLogin = () => {
    handleGithub_Login()
      .then((result) => {
        saveUserToDB(result.user); // ✅ Save user

        Swal.fire({
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;

    if (!checkbox) return toast.error("You must accept the terms and conditions.");

    handleLogin(email, password)
      .then((result) => {
        saveUserToDB(result.user); // ✅ Save user

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">Welcome Back!</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" required className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" required className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-[38px] right-3 text-gray-600 cursor-pointer">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" name="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">I agree to the terms</label>
          </div>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          New here? <Link to='/registration' className="text-primary hover:underline">Create an account</Link>
        </div>

        <div className="mt-6">
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" /> Continue with Google
          </button>
        </div>

        <div className="mt-3">
          <button onClick={handleGithubLogin} className="w-full flex items-center justify-center border py-2 rounded-md text-sm font-medium hover:bg-gray-100">
            <BsGithub className="text-xl mr-2" /> Continue with GitHub
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
