import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => { 
  const backendURL = import.meta.env.VITE_API_URL;
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate fields
  if (!values.username || !values.email || !values.password || !values.address) {
    setError("All fields are required.");
    return;
  }

  if (values.password !== retypePassword) {
    setError("Passwords do not match.");
    return;
  }

  setError(""); 
  setLoading(true);

  try {
    console.log("Sending Data:", values); // Debugging Line

    const response = await axios.post(`${backendURL}/api/v1/sign-up`, values);

    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    console.error("Sign-up error:", error.response?.data || error);
    setError(error.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 px-8 py-5 rounded-lg shadow-lg w-full md:w-3/6 lg:w-2/6">
        <h2 className="text-xl font-bold text-center mb-6 text-zinc-200">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              name="username"
              className="w-full mt-2 border border-zinc-700 bg-zinc-900 rounded p-2 outline-none text-zinc-100"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-zinc-400">Email ID</label>
            <input
              type="email"
              name="email"
              className="w-full text-zinc-100 p-2 bg-zinc-900 border border-zinc-700 rounded mt-1"
              placeholder="Email ID"
              value={values.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="text-zinc-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-2 text-zinc-100 bg-zinc-900 border border-zinc-700 rounded mt-1"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Retype Password */}
          <div className="mb-4 relative">
            <label className="block text-zinc-400">Retype Password</label>
            <input
              type={showRetypePassword ? "text" : "password"}
              className="w-full p-2 text-zinc-100 bg-zinc-900 border border-zinc-700 rounded mt-1"
              placeholder="Retype Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-sm text-gray-500"
              onClick={() => setShowRetypePassword(!showRetypePassword)}
            >
              {showRetypePassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-zinc-400">Address</label>
            <textarea
              className="w-full p-2 text-zinc-100 bg-zinc-900 border border-zinc-700 rounded mt-1"
              rows="3"
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-400 shadow-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-zinc-400 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
