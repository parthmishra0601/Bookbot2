import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from "axios";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books") // Replace with your actual API URL
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="flex bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-10 overflow-auto ml-0 lg:ml-80"
      >
        <motion.div
          className="bg-white bg-opacity-30 backdrop-blur-md shadow-xl p-6 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-4xl font-bold text-white flex items-center gap-2">
            <FaBookOpen /> Books Collection
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Browse our complete library database
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {books.map((book) => (
            <motion.div
              key={book.book_id}
              className="p-5 bg-white bg-opacity-30 backdrop-blur-md shadow-md rounded-lg hover:shadow-lg transition transform hover:scale-105 text-white"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-bold mb-2">{book.book_name}</h2>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Summary:</strong> {book.summary}</p>
              <p><strong>PDF:</strong> <a href={book.pdf_url} className="underline" target="_blank" rel="noreferrer">{book.pdf_url}</a></p>
              <p><strong>Audio Book:</strong> <a href={book.audio_book_url} className="underline" target="_blank" rel="noreferrer">{book.audio_book_url}</a></p>
              <p><strong>Status:</strong> {book.availability_status}</p>
              <p><strong>Location:</strong> {book.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BooksPage;
