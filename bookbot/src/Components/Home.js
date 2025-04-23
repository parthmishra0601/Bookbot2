import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen">
      {/* Background Image */}
      <img
        src="/Bgimage5.jpg" // Ensure this image exists in the "public" folder
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Semi-transparent Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to BookBot</h1>
        <p className="text-lg mb-6 max-w-md">
          Your smart AI-powered book assistant. Discover, read, and explore your
          favorite books effortlessly.
        </p>
        
        {/* Get Started Button */}
        <button
          className="px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-green-500 transition"
          onClick={() => navigate("/avatars")} // Redirects to Avatars Page
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
