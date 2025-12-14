import React from "react";
import {
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaUserMd,
  FaBrain,
  FaStar,
  FaMagic,
  FaAward,
} from "react-icons/fa";

const FeaturesSection = ({ features }) => (
  <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500 rounded-full blur-3xl opacity-10"></div>
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
          <FaStar className="text-green-400 text-sm" />
          <span className="text-green-400 text-sm font-medium">
            AI-Powered Features
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Why Choose <span className="text-green-500">HealthMate?</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experience the future of healthcare with our advanced AI technology
          designed to give you personalized health insights and recommendations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={feature.id} className="group relative">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* Feature Card */}
            <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-green-500/10 transform hover:scale-105 hover:border-green-500/30 transition-all duration-500 h-full group-hover:bg-[#151515]">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 inline-flex group-hover:border-green-500/50 transition-colors duration-500">
                  <div className="text-3xl text-green-400 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>

                {/* Feature Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 group-hover:text-green-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div className="flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium">Learn More</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <div className="inline-flex items-center gap-3 text-gray-400">
          <FaBrain className="text-green-500" />
          <span>Powered by Advanced AI Technology</span>
          <FaShieldAlt className="text-green-500 ml-4" />
          <span>100% Secure & Private</span>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
