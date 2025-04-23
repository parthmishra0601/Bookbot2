import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Demo books fallback
const demoBooks = [
  {
    id: 1,
    title: "React Essentials",
    author: "Dan Abramov",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    title: "Learning Tailwind",
    author: "Adam Wathan",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    author: "Kyle Simpson",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const DownloadBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/downloadable-books")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setBooks(demoBooks);
        } else {
          setBooks(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setBooks(demoBooks); // fallback to demo books on error
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen p-6 ml-0 lg:ml-64 bg-gradient-to-br from-purple-100 to-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">📥 Download Books</h2>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">No books available for download yet.</p>
        ) : (
          <motion.ul className="space-y-4" variants={containerVariants}>
            {books.map((book) => (
              <motion.li
                key={book.id}
                className="bg-gray-100 p-4 rounded shadow flex justify-between items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h4 className="text-lg font-semibold">{book.title}</h4>
                  <p className="text-gray-600">by {book.author}</p>
                </div>
                <motion.a
                  href={book.fileUrl}
                  download
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                  whileTap={{ scale: 0.95 }}
                >
                  Download
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DownloadBooks;
