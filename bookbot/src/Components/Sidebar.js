import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaBook, FaRobot, FaSignInAlt, FaShoppingCart, FaBell, FaSearch, FaPlus, FaHeadphones, FaClock, FaFileDownload, FaUserCircle, FaVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // To handle navigation

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#6D4C41] text-white w-72 p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-72"
        } md:translate-x-0 shadow-lg`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">📚 BookBot</h2>

        <ul className="space-y-6 text-lg">
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaHome /> <Link to="/home">Home</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaBook /> <Link to="/books">Books</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaRobot /> <Link to="/chatbot">Chatbot</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaSearch /> <Link to="/search">Search Books</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaPlus /> <Link to="/add-book">Add Book</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaHeadphones /> <Link to="/audiobooks">Audio Books</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaVideo /> <Link to="/videobooks">Video Books</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaClock /> <Link to="/extend-issue">Extend Issue Period</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaShoppingCart /> <Link to="/cart">Cart & Purchase</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaFileDownload /> <Link to="/download">Download Books</Link>
          </li>
          <li className="flex items-center gap-4 hover:text-gray-300 cursor-pointer">
            <FaBell /> <Link to="/notifications">Notifications</Link>
          </li>
          <li
            className="flex items-center gap-4 hover:text-gray-300 cursor-pointer"
            onClick={() => navigate("/login")} // Navigate to login page
          >
            <FaSignInAlt /> <span>Login</span>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="absolute top-5 left-5 md:hidden text-white text-3xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default Sidebar;
