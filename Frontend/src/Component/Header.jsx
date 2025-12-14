import React from "react";
import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-600"
        />
      </div>
    </div>
  );
};

export default Header;
