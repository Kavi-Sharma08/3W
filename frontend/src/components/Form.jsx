import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/UserContext';
import axios from "axios";

const Form = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [togglePasswordEye, setTogglePasswordEye] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [Login, setLogin] = useState(false); // false = Sign Up, true = Sign In

  const [formData, setFormData] = useState({
    username: "Kavi26",
    name: "Kavi",
    password: "Kavi@123"
  });

  const handleLogin = () => {
    setLogin(prev => !prev);
    setUsernameError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");

    try {
      if (!Login) {
        // Sign Up mode
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addUser`, {
          username: formData.username,
          name: formData.name,
          password: formData.password,
        });

        console.log("User signed up:", res.data);
        // Switch to Login view after successful signup
        setLogin(true);
        // Optionally reset form fields
        setFormData(prev => ({ ...prev, name: "", password: "" }));
      } else {
        // Sign In mode
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
          username: formData.username,
          password: formData.password,
        });

        console.log("User logged in:", res.data);
        setUser(res.data);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
      console.log(error)
      const message = error?.response?.data?.message || "Something went wrong";
      setUsernameError(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          {Login ? "Sign In" : "Sign Up"} <span className="text-blue-500">Profile</span>
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              autoComplete="off"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, username: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter username"
            />
            {usernameError && (
              <p className="text-red-600 mt-1">{usernameError}</p>
            )}
          </div>

          {!Login && (
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                autoComplete="off"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Enter full name"
              />
            </div>
          )}

          <div className="relative flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              autoComplete="off"
              type={!togglePasswordEye ? "password" : "text"}
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, password: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter password"
            />
            <span
              onClick={() => setTogglePasswordEye(prev => !prev)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {!togglePasswordEye ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 font-semibold transition"
          >
            {Login ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-center text-sm">
            <span>{Login ? "Don’t have an account?" : "Already a user?"}</span>
            <button
              type="button"
              onClick={handleLogin}
              className="text-indigo-600 ml-1 underline"
            >
              {Login ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
