import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const booksData = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
  { id: 3, title: "Deep Work", author: "Cal Newport" },
  { id: 4, title: "The Lean Startup", author: "Eric Ries" },
  { id: 5, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 flex flex-col items-center p-10">
      <motion.h1
        className="text-4xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Search Books 📖
      </motion.h1>

      {/* Search Input */}
      <div className="relative w-full max-w-lg mb-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a book..."
          className="w-full px-12 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Books List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              className="p-5 bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold text-white">{book.title}</h2>
              <p className="text-gray-200">by {book.author}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-lg">No books found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBooks;
