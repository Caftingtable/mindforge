import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authentication";
import { updateProfile } from "firebase/auth";
import auth from "./firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { BsGithub } from "react-icons/bs";
import Swal from 'sweetalert2';
import useMyBackendAxios from "../Hooks/useMyBackendAxios"; // ✅ Using your backend
import logo from "../assets/logo-black.png";

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roleDes, setRoleDes] = useState('');
  const { handleRegister, handleGoogle_Login, handleGithub_Login } = useContext(AuthContext);
  const axiosMyBackend = useMyBackendAxios(); // ✅ Use your backend

  const handleGoogleLogin = () => {
    handleGoogle_Login()
      .then((result) => {
        const user = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo_url: result.user?.photoURL,
          role: 'student',
        };
        axiosMyBackend.post('/users', user).then(res => {
          if (res.data.insertedId) {
            Swal.fire({ icon: 'success', title: 'Successfully Registered', timer: 2000, showConfirmButton: false });
            navigate('/');
          }
        });
      })
      .catch(error => toast.error(error.message));
  };

  const handleGithubLogin = () => {
    handleGithub_Login()
      .then(() => {
        Swal.fire({ icon: 'success', title: 'Successfully Registered', timer: 2000, showConfirmButton: false });
        navigate('/');
      })
      .catch(error => toast.error(error.message));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, photo_url, checkbox, specialized, role } = e.target;
    if (password.value.length < 6 || !/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value)) {
      return toast.error("Password must be at least 6 characters and include both upper and lower case letters.");
    }
    if (!checkbox.checked) return toast.error("You must accept the terms and conditions.");

    handleRegister(email.value, password.value, role.value)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name.value,
          photoURL: photo_url.value,
        }).then(() => {
          const newUser = {
            name: name.value,
            email: email.value,
            photo_url: photo_url.value,
            role: role.value,
            specialized: specialized?.value,
          };
          axiosMyBackend.post('/users', newUser).then(res => {
            if (res.data.insertedId) {
              e.target.reset();
              Swal.fire({ icon: 'success', title: 'Successfully Registered', timer: 2000, showConfirmButton: false });
              navigate('/');
            }
          });
        }).catch(error => toast.error(error.message));
      })
      .catch(error => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <div className="mb-6">
        <img src={logo} alt="MindForge Logo" className="h-14" />
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl px-8 py-10 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Create Your Account</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Name</label>
            <input type="text" name="name" placeholder="Your full name" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Photo URL</label>
            <input type="text" name="photo_url" placeholder="https://yourphoto.jpg" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Role</label>
            <select name="role" required onChange={(e) => setRoleDes(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none">
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          {roleDes === 'tutor' && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Specialized In</label>
              <input type="text" name="specialized" placeholder="e.g. Math, Physics" required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">Password</label>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="At least 6 characters" required
              className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none" />
            <span className="absolute right-3 top-9 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" name="checkbox" className="mr-2" /> I accept the terms & conditions
            </label>
            <Link to='/login' className="text-primary font-medium hover:underline">Already have an account?</Link>
          </div>

          <button type="submit" className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition">
            Register
          </button>
        </form>

        <div className="my-4 text-center text-gray-500 dark:text-gray-400 text-sm">or</div>

        <div className="space-y-2">
          <button onClick={handleGoogleLogin}
            className="w-full py-2 px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium flex items-center justify-center">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
          <button onClick={handleGithubLogin}
            className="w-full py-2 px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium flex items-center justify-center">
            <BsGithub className="mr-2" /> Continue with GitHub
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Registration;
