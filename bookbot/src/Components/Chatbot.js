import React, { useState } from "react";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({ ageGroup: "", genre: "", author: "" });

  const sendMessage = async () => {
    if (!formData.ageGroup || !formData.genre) {
      alert("Please enter age group and genre.");
      return;
    }

    setMessages([...messages, { sender: "user", text: input }]);

    // Send the user's query to the backend chatbot_queries route
    await fetch("http://localhost:5000/api/chatbot_queries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    // Now only send the user query to the chatbot endpoint, no recommendation endpoint
    const botReply = `🤖 Your query: "${input}" has been received!`;

    setMessages([...messages, { sender: "user", text: input }, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        className="w-full max-w-3xl bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-white border-opacity-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-white mb-6">🤖 Book Recommendation Chatbot</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-white block mb-2">👶 Age Group:</label>
            <select
              className="w-full p-3 rounded-lg bg-white bg-opacity-70 text-gray-800"
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
            >
              <option value="">Select Age Group</option>
              <option value="10-18">10-18</option>
              <option value="18+">18+</option>
            </select>
          </div>

          <div>
            <label className="text-white block mb-2">📚 Genre:</label>
            <select
              className="w-full p-3 rounded-lg bg-white bg-opacity-70 text-gray-800"
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            >
              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Fiction">Fiction</option>
              <option value="Classic">Classic</option>
            </select>
          </div>

          <div>
            <label className="text-white block mb-2">✍️ Preferred Author:</label>
            <input
              className="w-full p-3 rounded-lg bg-white bg-opacity-70 text-gray-800"
              type="text"
              placeholder="Enter author name"
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>
        </div>

        <motion.div
          className="h-64 overflow-y-auto bg-white bg-opacity-50 p-4 rounded-xl shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg mb-3 max-w-[85%] shadow ${
                msg.sender === "user"
                  ? "bg-blue-400 ml-auto text-white text-right"
                  : "bg-gray-200 mr-auto text-gray-800 text-left"
              }`}
              initial={{ opacity: 0, x: msg.sender === "user" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                {msg.sender === "user" ? (
                  <>
                    <span className="ml-auto mr-2">{msg.text}</span>
                    <FaUser />
                  </>
                ) : (
                  <>
                    <FaRobot className="mr-2" />
                    <span>{msg.text}</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex mt-4">
          <motion.input
            type="text"
            className="flex-grow p-3 rounded-lg bg-white bg-opacity-80 text-gray-800"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            className="ml-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-800"
            onClick={sendMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
