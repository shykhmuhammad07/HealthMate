import React, { useState } from "react";
import {
  FaHeartbeat,
  FaAppleAlt,
  FaUserFriends,
  FaChartLine,
  FaLock,
  FaEnvelope,
  FaUser,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const features = [
  {
    title: "Track Your Health",
    desc: "Monitor your daily health stats and stay consistent.",
    icon: <FaHeartbeat className="text-red-500 text-2xl" />,
  },
  {
    title: "Healthy Diet Plans",
    desc: "Get personalized meal recommendations for better nutrition.",
    icon: <FaAppleAlt className="text-green-500 text-2xl" />,
  },
  {
    title: "Community Support",
    desc: "Join a health-focused community that motivates and inspires.",
    icon: <FaUserFriends className="text-blue-500 text-2xl" />,
  },
  {
    title: "Progress Insights",
    desc: "Analyze your growth and improve with data-driven insights.",
    icon: <FaChartLine className="text-purple-500 text-2xl" />,
  },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form, // yahan data jaata hai
        { withCredentials: true } // config object
      );
      console.log("Server response:", res.data);
      console.log("register successful");
      navigate("/login");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-10 py-16">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-28">
        {/* Left: Features */}
        <div className="space-y-8 max-w-md text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6">
            Join <span className="text-green-500">HealthMate</span> Today
          </h2>
          {features.map((item, i) => (
            <div
              key={i}
              className="flex items-start justify-center md:justify-start gap-4"
            >
              <span>{item.icon}</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-6">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Register Form */}
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl p-10 w-full md:w-[420px]">
          <h1 className="text-3xl font-bold text-center mb-3">
            Create Your <span className="text-green-500">HealthMate</span>{" "}
            Account
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Sign up to start tracking your health and fitness journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  type="text"
                  placeholder="John Doe"
                  className="p-3 pl-10 w-full bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <input
                  onChange={handleChange}
                  name="email"
                  value={form.email}
                  type="email"
                  placeholder="you@healthmate.com"
                  className="p-3 pl-10 w-full bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  onChange={handleChange}
                  name="password"
                  value={form.password}
                  type="password"
                  placeholder="••••••••"
                  className="p-3 pl-10 w-full bg-[#1a1a1a] border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 hover:underline">
              Sign in
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-grow border-gray-700" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Social Signup */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-[#1a1a1a] transition">
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-[#1a1a1a] transition">
              <FaFacebook className="text-blue-500" />
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
