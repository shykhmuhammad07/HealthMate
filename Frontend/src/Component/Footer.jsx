import React from "react";
import {
  FaHeartbeat,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";
import AnimatedButton from "./Button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Privacy", path: "/privacy" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Support", path: "/support" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF className="text-sm" />,
      url: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: <FaTwitter className="text-sm" />,
      url: "#",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaInstagram className="text-sm" />,
      url: "#",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaLinkedin className="text-sm" />,
      url: "#",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-5"></div>
      <div className="absolute top-10 right-1/4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-5"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-lg blur-md opacity-20"></div>
                <FaHeartbeat className="text-green-500 text-3xl relative" />
              </div>
              <h3 className="text-3xl font-bold">
                <span className="text-green-500">Health</span>Mate
              </h3>
            </div>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
              Your AI-powered health companion. Upload medical reports, get
              intelligent insights, and take control of your wellness journey
              with cutting-edge technology.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-500" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserMd className="text-green-500" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className="text-gray-400 hover:text-green-500  duration-300 py-2 hover:translate-x-1 transform transition-transform"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Connect With Us
            </h4>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Get the latest health insights and updates from our AI platform.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-[#0f0f0f] border border-gray-700 rounded-lg  py-2 text-sm focus:border-green-500 focus:outline-none transition-colors"
                  />
                  <AnimatedButton>Subscribe</AnimatedButton>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-10 h-10 flex items-center justify-center bg-[#0f0f0f] border border-gray-700 rounded-lg text-gray-400 ${social.color} hover:border-current hover:scale-110 transition-all duration-300`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HealthMate AI. All rights reserved.
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <a
              href="/privacy"
              className="hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-green-500 transition-colors">
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="hover:text-green-500 transition-colors"
            >
              Cookie Policy
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <FaArrowUp className="text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
