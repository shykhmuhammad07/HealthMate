import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaSignOutAlt,
  FaHistory,
  FaCog,
  FaEdit,
} from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa"; // likely correct
import { FaUpload } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    reportsUploaded: 0,
    aiAnalyses: 0,
    joinedDate: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user",
          {},
          { withCredentials: true }
        );
        if (res.data) {
          console.log(res.data);

          setUser(res.data.user);
          // Mock stats - replace with actual API calls
          setStats({
            reportsUploaded: 12,
            aiAnalyses: 8,
            joinedDate: new Date(
              res.data.user.createdAt || Date.now()
            ).toLocaleDateString(),
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Profile error:", error.response?.data || error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API fails
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            User Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <FaUser className="text-3xl text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                    <FaEdit className="text-xs text-black" />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {user?.name || "User Name"}
                  </h2>
                  <p className="text-gray-400 text-sm">Medical Professional</p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FaCalendar className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white font-medium">{stats.joinedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FaShieldAlt className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <p className="text-green-500 font-medium">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FaHistory className="text-blue-500" />
                Activity Statistics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-900 rounded-xl">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {stats.reportsUploaded}
                  </div>
                  <p className="text-gray-400 text-sm">Reports Uploaded</p>
                </div>

                <div className="text-center p-4 bg-gray-900 rounded-xl">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {stats.aiAnalyses}
                  </div>
                  <p className="text-gray-400 text-sm">AI Analyses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/uploadMedia")}
                  className="w-full flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 transition"
                >
                  <FaUpload className="text-green-500" />
                  <span className="text-white font-medium">Upload Report</span>
                </button>

                <button
                  onClick={() => navigate("/aireport")}
                  className="w-full flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition"
                >
                  <FaHistory className="text-blue-500" />
                  <span className="text-white font-medium">
                    View AI Reports
                  </span>
                </button>
              </div>
            </div>

            {/* Logout Card */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Account</h3>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
              >
                <FaSignOutAlt />
                <span className="font-semibold">Logout</span>
              </button>

              <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                <p className="text-gray-400 text-sm text-center">
                  Last login: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Security Status */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
