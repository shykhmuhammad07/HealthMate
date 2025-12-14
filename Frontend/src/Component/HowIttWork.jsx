import React from "react";
import {
  FaUserPlus,
  FaBullseye,
  FaChartLine,
  FaTrophy,
  FaArrowRight,
  FaUpload,
  FaRobot,
  FaFileMedical,
} from "react-icons/fa";
import AnimatedButton from "./Button";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: <FaUserPlus className="text-2xl" />,
      title: "Upload Report",
      desc: "Upload your medical reports securely to our AI-powered platform.",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:shadow-blue-500/20",
    },
    {
      step: 2,
      icon: <FaRobot className="text-2xl" />,
      title: "AI Analysis",
      desc: "Our advanced AI analyzes your reports and identifies key health indicators.",
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:shadow-purple-500/20",
    },
    {
      step: 3,
      icon: <FaFileMedical className="text-2xl" />,
      title: "Get Insights",
      desc: "Receive detailed health insights and personalized recommendations.",
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:shadow-green-500/20",
    },
    {
      step: 4,
      icon: <FaChartLine className="text-2xl" />,
      title: "Track Progress",
      desc: "Monitor your health journey with detailed analytics and progress tracking.",
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:shadow-orange-500/20",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
            <FaUpload className="text-green-400 text-sm" />
            <span className="text-green-400 text-sm font-medium">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            How <span className="text-green-500">HealthMate</span> Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your healthcare experience in just four simple steps with
            our AI-powered platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="group relative">
                {/* Step Card */}
                <div
                  className={`relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-2xl p-6 text-center h-full transition-all duration-500 hover:scale-105 hover:border-green-500/50 ${item.hoverColor} hover:shadow-2xl`}
                >
                  {/* Step Number with Gradient */}
                  <div className="relative inline-flex mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity`}
                    ></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-full flex items-center justify-center group-hover:border-green-500/50 transition-colors">
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                      >
                        {item.step}
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity`}
                      ></div>
                      <div
                        className={`relative p-3 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-700 text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl mb-3 group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Hover Arrow */}
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow for Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-500">
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl px-8 py-6">
            <div className="text-left">
              <h3 className="font-bold text-lg mb-1">Ready to Get Started?</h3>
              <p className="text-gray-400 text-sm">
                Join thousands of users transforming their health with AI
              </p>
            </div>
            <AnimatedButton filled>Start Your Journey</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
