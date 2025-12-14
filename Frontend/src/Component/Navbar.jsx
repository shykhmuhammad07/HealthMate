import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeartbeat,
  FaUser,
  FaHome,
  FaUpload,
  FaFileMedical,
  FaChartLine,
} from "react-icons/fa";
import AnimatedButton from "./Button";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user",
          {},
          { withCredentials: true }
        );
        setId(!!res.data);
      } catch (error) {
        setId(false);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [location]);
  

  const links = [
    { name: "Home", path: "/", icon: <FaHome className="text-sm" /> },
    {
      name: "Upload Report",
      path: "/uploadMedia",
      icon: <FaUpload className="text-sm" />,
    },
    {
      name: "AI Reports",
      path: "/aireport",
      icon: <FaFileMedical className="text-sm" />,
    },
    {
      name: "My Reports",
      path: "/myreport",
      icon: <FaChartLine className="text-sm" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest("nav")) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
    <div className="fixed top-0 left-0 w-full flex justify-center z-50">
      <nav
        className={`${
          scroll
            ? "backdrop-blur-md w-[95%] lg:w-[85%] mt-2 sm:mt-3 rounded-2xl sm:rounded-full bg-black/90 border border-gray-800 shadow-xl"
            : "w-full bg-black/70 border-b border-gray-800 shadow-lg"
        } text-white mx-auto transition-all duration-500 ease-in-out`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center">
          {/* Left: Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <FaHeartbeat className="text-green-500 text-2xl sm:text-3xl animate-pulse group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              <span className="text-green-500">Health</span>Mate
            </h1>
          </div>

          {/* Center: Links (desktop/tablet only) */}
          <ul className="hidden md:flex items-center gap-3 lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
            {id
              ? links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-300 ${
                        location.pathname === link.path
                          ? "text-green-500 bg-green-500/10 border border-green-500/20"
                          : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))
              : ""}
          </ul>

          {/* Right: Buttons (desktop/tablet only) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {id ? (
              <AnimatedButton to="/profile" filled size="sm">
                Profile
              </AnimatedButton>
            ) : (
              <>
                <AnimatedButton to="/login" size="sm">
                  Sign In
                </AnimatedButton>

                <AnimatedButton to="/register" filled size="sm">
                  Sign Up
                </AnimatedButton>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700 text-green-500 transition-all duration-300 hover:bg-gray-700 hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
          >
            {open ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 px-4">
            <ul className="flex flex-col gap-2 py-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-green-500 bg-green-500/10 border border-green-500/20"
                        : "text-gray-300 hover:text-green-500 hover:bg-gray-800/50"
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium text-[12px]">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 px-4 py-3 border-t border-gray-800">
              <AnimatedButton
                to="/login"
                fullWidth
                onClick={() => setOpen(false)}
              >
                Sign In
              </AnimatedButton>
              <AnimatedButton
                to="/register"
                filled
                fullWidth
                onClick={() => setOpen(false)}
              >
                Sign Up
              </AnimatedButton>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed  md:hidden" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Navbar;
