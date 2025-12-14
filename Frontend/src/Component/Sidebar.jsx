import React from "react";
import {
  FaUserMd,
  FaNotesMedical,
  FaStethoscope,
  FaCog,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Healthmate</h1>
      <nav className="flex flex-col gap-4">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-700"
        >
          <FaUserMd /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-700"
        >
          <FaUser /> Patients
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-700"
        >
          <FaStethoscope /> Appointments
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-700"
        >
          <FaNotesMedical /> AI Reports
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded hover:bg-blue-700"
        >
          <FaCog /> Settings
        </a>
      </nav>
      <div className="mt-auto text-center text-sm text-blue-200">
        © 2025 Healthmate
      </div>
    </aside>
  );
};

export default Sidebar;
