import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBook, FaRobot, FaBookmark, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dynamic state for tracking user activity
  const [data, setData] = useState([
    { name: "Jan", booksRead: 5, aiChats: 10 },
    { name: "Feb", booksRead: 7, aiChats: 15 },
    { name: "Mar", booksRead: 10, aiChats: 20 },
    { name: "Apr", booksRead: 8, aiChats: 18 },
    { name: "May", booksRead: 12, aiChats: 25 }
  ]);

  return (
    <div className="flex bg-gradient-to-br from-purple-400 to-pink-500 min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex-1 p-10 overflow-auto ml-0 lg:ml-80"
      >
        {/* Welcome Section */}
        <motion.div className="bg-white bg-opacity-30 backdrop-blur-md shadow-xl p-6 rounded-xl" whileHover={{ scale: 1.02 }}>
          <h1 className="text-4xl font-bold text-white">Welcome to BookBot Dashboard 📚</h1>
          <p className="mt-2 text-lg text-gray-200">Explore books, chat with AI, and track your progress!</p>
        </motion.div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card title="Explore Books" icon={<FaBook />} link="/books" />
          <Card title="Chat with AI" icon={<FaRobot />} link="/chatbot" />
          <Card title="Bookmarks" icon={<FaBookmark />} link="/bookmarks" />
        </div>

        {/* Graph Section */}
        <Section title="📊 User Activity Overview">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip wrapperClassName="bg-white p-2 rounded-md shadow-lg" />
              <Legend />
              <Line type="monotone" dataKey="booksRead" stroke="#FFD700" strokeWidth={3} />
              <Line type="monotone" dataKey="aiChats" stroke="#4CAF50" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Section>

        {/* Notifications */}
        <Section title="🔔 Notifications">
          <ul className="list-disc pl-4 text-white">
            <li>New book releases available now!</li>
            <li>Chatbot has been updated with new features.</li>
          </ul>
        </Section>

        {/* Buttons to Simulate Activity */}
        <div className="flex gap-6 mt-8">
          <motion.button
            onClick={() => navigate("/purchase")}
            whileHover={{ scale: 1.1 }}
            className="px-5 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FaShoppingCart /> Purchase a Book
          </motion.button>
          <motion.button
            onClick={() => navigate("/chatbot")}
            whileHover={{ scale: 1.1 }}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaRobot /> Chat with AI
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Card Component
const Card = ({ title, icon, link }) => (
  <motion.a 
    href={link} 
    className="p-5 bg-white bg-opacity-30 backdrop-blur-md shadow-md rounded-lg flex items-center gap-4 hover:shadow-lg transition transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-2xl text-yellow-300">{icon}</div>
    <h2 className="text-lg font-semibold text-white">{title}</h2>
  </motion.a>
);

// Section Wrapper
const Section = ({ title, children }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 0.5 }}
    className="mt-8"
  >
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="mt-4 p-6 bg-white bg-opacity-30 backdrop-blur-md shadow-md rounded-lg">{children}</div>
  </motion.div>
);

export default Dashboard;
