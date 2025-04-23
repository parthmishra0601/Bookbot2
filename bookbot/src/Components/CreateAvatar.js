import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAvatar = () => {
  const navigate = useNavigate();

  // Avatar options
  const hairStyles = ["Short", "Curly", "Bald", "Ponytail"];
  const eyeColors = ["Blue", "Green", "Brown", "Black"];
  const clothes = ["Casual", "Formal", "Sporty", "Traditional"];

  // State to store selected options
  const [avatar, setAvatar] = useState({
    hair: hairStyles[0],
    eyes: eyeColors[0],
    clothing: clothes[0],
  });

  // Update selection
  const handleChange = (type, value) => {
    setAvatar((prev) => ({ ...prev, [type]: value }));
  };

  // Save avatar & navigate
  const handleConfirm = () => {
    localStorage.setItem("customAvatar", JSON.stringify(avatar));
    navigate("/dashboard"); // Redirect after saving
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Create Your Avatar</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {/* Avatar Preview */}
        <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <p className="text-lg font-semibold">Avatar Preview</p>
          <p>Hair: {avatar.hair}</p>
          <p>Eyes: {avatar.eyes}</p>
          <p>Clothing: {avatar.clothing}</p>
        </div>

        {/* Dropdowns for customization */}
        <div className="flex flex-col gap-4">
          {/* Hair Selection */}
          <select
            className="p-2 border rounded-md"
            value={avatar.hair}
            onChange={(e) => handleChange("hair", e.target.value)}
          >
            {hairStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>

          {/* Eye Selection */}
          <select
            className="p-2 border rounded-md"
            value={avatar.eyes}
            onChange={(e) => handleChange("eyes", e.target.value)}
          >
            {eyeColors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          {/* Clothing Selection */}
          <select
            className="p-2 border rounded-md"
            value={avatar.clothing}
            onChange={(e) => handleChange("clothing", e.target.value)}
          >
            {clothes.map((outfit) => (
              <option key={outfit} value={outfit}>{outfit}</option>
            ))}
          </select>
        </div>

        {/* Confirm Button */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleConfirm}
        >
          Confirm Avatar
        </button>
      </div>
    </div>
  );
};

export default CreateAvatar;
