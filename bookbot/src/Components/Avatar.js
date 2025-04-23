import React from "react";
import { useNavigate } from "react-router-dom";

const Avatars = () => {
  const navigate = useNavigate();

  const avatarUrls = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
  ];

  // Function to handle avatar selection
  const handleAvatarSelect = (avatar) => {
    localStorage.setItem("selectedAvatar", avatar); // Store selected avatar in local storage
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Bgimage5.jpg')" }} // Use the correct path from the public folder
    >
      <h1 className="text-3xl font-bold text-white mb-6">Choose Your Avatar</h1>

      {/* Avatars in a Single Line */}
      <div className="flex gap-6 overflow-x-auto px-4 items-center">
        {avatarUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Avatar"
            className="w-24 h-24 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
            onClick={() => handleAvatarSelect(url)} // Set avatar & navigate
          />
        ))}

        {/* Create Your Own Avatar Button */}
        <button
          className="w-24 h-24 flex items-center justify-center border-2 border-white text-white rounded-full shadow-lg bg-gray-800 hover:bg-gray-600 transition"
          onClick={() => navigate("/create-avatar")} // Redirect to avatar creation page
        >
          ➕
        </button>
      </div>
    </div>
  );
};

export default Avatars;
