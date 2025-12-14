import React from "react";
import { Link } from "react-router-dom";

const AnimatedButton = ({ children, filled = false, to = "#", id }) => {
  const isDisabled = Boolean(id);

  return (
    <Link
      to={isDisabled ? "#" : to}
      onClick={(e) => isDisabled && e.preventDefault()}
      className={`relative inline-block px-6 py-2 font-medium border border-green-500 
        overflow-hidden group rounded-full transition-all duration-300
        ${filled ? "bg-green-500 text-black" : "bg-transparent text-green-500"}
        hover:shadow-lg hover:shadow-green-500/30
        ${isDisabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
      `}
    >
      {/* Sliding background */}
      <span
        className={`absolute inset-0 transition-transform duration-500 ease-out transform-gpu
          ${
            filled
              ? "bg-black translate-y-full group-hover:translate-y-0"
              : "bg-green-500 translate-y-full group-hover:translate-y-0"
          }
        `}
      ></span>

      {/* Text color change */}
      <span
        className={`relative z-10 transition-colors duration-300
          ${filled ? "group-hover:text-green-500" : "group-hover:text-black"}
        `}
      >
        {children}
      </span>
    </Link>
  );
};

export default AnimatedButton;
