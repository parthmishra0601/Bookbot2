import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const demoVideoBooks = [
  {
    id: 1,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    video_url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const VideoBooks = () => {
  const [videobooks, setVideoBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/videobooks")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setVideoBooks(demoVideoBooks);
        } else {
          setVideoBooks(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setVideoBooks(demoVideoBooks); // fallback to demo data
      })
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-6 ml-0 lg:ml-64 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-8 mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          📺 Featured VideoBooks
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading VideoBooks...</p>
        ) : videobooks.length === 0 ? (
          <p className="text-center text-red-500">No videobooks found.</p>
        ) : (
          <motion.ul className="space-y-8" variants={containerVariants}>
            {videobooks.map((book) => (
              <motion.li
                key={book.id}
                className="p-6 bg-blue-50 rounded-xl shadow-md flex flex-col items-center"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-4">by {book.author}</p>
                <motion.video
                  controls
                  className="rounded-lg shadow-lg w-full max-w-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <source src={book.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VideoBooks;
