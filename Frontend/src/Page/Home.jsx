import React from "react";
import HeroSection from "../Component/Herosection";
import FeaturesSection from "../Component/FeatureSection";
import HowItWorks from "../Component/HowIttWork";
import Testimonials from "../Component/Testimonial";
import Footer from "../Component/Footer";

const Home = () => {
  const features = [
    {
      id: 1,
      title: "Health Tracking",
      description:
        "Monitor your daily activities, heart rate, sleep patterns and more.",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Medical Records",
      description:
        "Securely store and access your medical history, prescriptions, and test results.",
      icon: "📋",
      color: "from-pink-500 to-blue-400",
    },
    {
      id: 3,
      title: "Doctor Connect",
      description: "Book appointments and consult with doctors online.",
      icon: "👨‍⚕️",
      color: "from-blue-400 to-purple-500",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "HealthMate transformed how I manage my wellness journey.",
      avatar: "👩",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Patient",
      content: "Keeps all my medical records organized. Highly recommended!",
      avatar: "👨",
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      role: "Cardiologist",
      content: "A game-changer for patient monitoring.",
      avatar: "👩‍⚕️",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 m-0 p-0">
      <HeroSection />
      <FeaturesSection features={features} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <Footer />
    </div>
  );
};

export default Home;
