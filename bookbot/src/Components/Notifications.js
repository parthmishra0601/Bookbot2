import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react"; // Importing an icon for UI enhancement

const demoNotifications = [
  {
    id: 1,
    message: "🎉 You’ve earned a new badge for reading 3 books this week!",
    time: "2 minutes ago",
  },
  {
    id: 2,
    message: "📥 Your download for 'React Essentials' has started.",
    time: "10 minutes ago",
  },
  {
    id: 3,
    message: "🛒 Your purchase of 'Atomic Habits' was successful.",
    time: "1 hour ago",
  },
  {
    id: 4,
    message: "✅ You completed watching 'Deep Work' videobook.",
    time: "Yesterday",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.length > 0 ? data : demoNotifications);
      })
      .catch(() => setNotifications(demoNotifications));

    const interval = setInterval(() => {
      console.log("Refreshing notifications...");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = () => {
    setNotifications([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
            <Bell className="mr-2 text-indigo-600" />
            Notifications
          </h2>
          <button
            onClick={markAllAsRead}
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            Mark All as Read
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No new notifications right now.</p>
        ) : (
          <motion.ul className="space-y-4">
            {notifications.map((note) => (
              <motion.li
                key={note.id}
                className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg shadow-md"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="text-gray-800 text-base">{note.message}</p>
                <span className="text-sm text-gray-500">{note.time}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Notifications;
