import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaAppleAlt,
  FaUserFriends,
  FaChartLine,
  FaRobot,
  FaStethoscope,
  FaShieldAlt,
  FaArrowRight,
  FaUpload,
  FaFileMedical,
  FaUserMd,
} from "react-icons/fa";
import med1 from "../assets/med1.png";
import med2 from "../assets/med2.png";
import med3 from "../assets/med3.png";
import med4 from "../assets/med4.png";
import AnimatedButton from "./Button";

const HeroSection = () => {
  const navigate = useNavigate();
  const images = [med1, med2, med3, med4];
  const [bgIndex, setBgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaUpload className="text-red-400 text-3xl" />,
      title: "Upload Your Report",
      desc: "Upload your medical report and let AI analyze key health indicators instantly.",
      path: "/uploadMedia",
      gradient: "from-red-500/20 to-red-500/5",
      borderColor: "group-hover:border-red-400",
    },
    {
      icon: <FaFileMedical className="text-green-400 text-3xl" />,
      title: "AI Health Insights",
      desc: "View AI summaries and health insights tailored to your uploaded data.",
      path: "/aireport",
      gradient: "from-green-500/20 to-green-500/5",
      borderColor: "group-hover:border-green-400",
    },
    {
      icon: <FaUserMd className="text-blue-400 text-3xl" />,
      title: "Health Profile",
      desc: "Manage your personal details, medical history, and track your wellness progress.",
      path: "/profile",
      gradient: "from-blue-500/20 to-blue-500/5",
      borderColor: "group-hover:border-blue-400",
    },
    {
      icon: <FaChartLine className="text-purple-400 text-3xl" />,
      title: "Health Reports",
      desc: "View all previous reports with easy-to-read charts showing your health trends.",
      path: "/myreport",
      gradient: "from-purple-500/20 to-purple-500/5",
      borderColor: "group-hover:border-purple-400",
    },
  ];

  return (
    <section
      className="min-h-screen text-white flex items-center px-6 py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Description */}
          <div
            className={`text-left transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-sm"></div>
                <FaRobot className="text-green-400 text-lg relative" />
              </div>
              <span className="text-green-400 font-semibold text-sm">
                AI-Powered Health Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight">
              Your Health,{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                AI-Enhanced
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg lg:text-xl mb-6 leading-relaxed">
              HealthMate is an advanced AI platform that analyzes your medical
              reports to provide
              <span className="text-green-400 font-semibold">
                {" "}
                smart, data-driven health insights
              </span>{" "}
              and personalized recommendations for better wellness outcomes.
            </p>

            {/* Tagline */}
            <div className="mb-8 p-4 border-l-4 border-green-500 bg-green-500/5 rounded-r-lg">
              <p className="text-green-400 italic text-lg font-medium">
                <b>Health Mate - Sehat ka perfect partner</b>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <AnimatedButton to="/register" filled>
                <div className="flex items-center gap-2">
                  Get Started Free
                  <FaArrowRight className="text-sm" />
                </div>
              </AnimatedButton>
              <AnimatedButton to="/login" outline>
                Already a Member?
              </AnimatedButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm"></div>
                  <FaStethoscope className="text-green-400 relative" />
                </div>
                <span>Medical Grade AI</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm"></div>
                  <FaShieldAlt className="text-green-400 relative" />
                </div>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm"></div>
                  <FaHeartbeat className="text-green-400 relative" />
                </div>
                <span>24/7 Health Monitoring</span>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {features.map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col justify-between cursor-pointer h-[220px] transition-all duration-500 hover:scale-105 hover:shadow-2xl ${item.borderColor}`}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      item.borderColor.split("-")[1]
                    }-400/30, transparent 70%)`,
                  }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                  {/* Icon */}
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 mt-2">
                    <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
