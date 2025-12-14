import React from "react";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import AnimatedButton from "./Button";

const Testimonials = ({ testimonials }) => (
  <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500 rounded-full blur-3xl opacity-10"></div>
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
          <FaQuoteLeft className="text-green-400 text-sm" />
          <span className="text-green-400 text-sm font-medium">
            Success Stories
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          What Our <span className="text-green-500">Users Say</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover how HealthMate AI is transforming healthcare experiences for
          people worldwide.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={t.id}
            className="group relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

            {/* Testimonial Card */}
            <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-green-500/10 transform hover:scale-105 hover:border-green-500/30 transition-all duration-500 h-full group-hover:bg-[#151515]">
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-white text-sm" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < t.rating
                        ? "text-yellow-400 text-sm"
                        : "text-gray-600 text-sm"
                    }
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-300 leading-relaxed mb-6 italic text-lg">
                "{t.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-20"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                    {t.avatar || (
                      <FaUserCircle className="text-2xl text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{t.name}</h4>
                  <p className="text-green-400 text-sm">{t.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{t.location}</p>
                </div>
              </div>

              {/* Health Improvement Indicator */}
              {t.improvement && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-400">Health Improvement</span>
                    <span className="text-white font-semibold">
                      {t.improvement}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-800">
        {[
          { number: "10K+", label: "Users Trust Us" },
          { number: "50K+", label: "Reports Analyzed" },
          { number: "98%", label: "Accuracy Rate" },
          { number: "24/7", label: "AI Support" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-400 mb-6">
          Join thousands of satisfied users who transformed their health journey
          with AI
        </p>
        <AnimatedButton>Share Your Story</AnimatedButton>
      </div>
    </div>
  </section>
);

export default Testimonials;
