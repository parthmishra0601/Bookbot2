import React, { useState } from "react";
import { motion } from "framer-motion";

const ExtendIssuePeriod = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [newDate, setNewDate] = useState("");
  const [message, setMessage] = useState("");

  const books = [
    "The Alchemist",
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "Harry Potter",
  ];

  const handleExtend = () => {
    if (selectedBook && newDate) {
      setMessage(`Issue period for '${selectedBook}' extended to ${newDate}.`);
    } else {
      setMessage("Please select a book and choose a new return date.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-6"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Extend Issue Period</h2>
        
        {/* Book Selection */}
        <label className="block text-gray-600 mb-2">Select a Book:</label>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">-- Choose a Book --</option>
          {books.map((book, index) => (
            <option key={index} value={book}>{book}</option>
          ))}
        </select>
        
        {/* Date Picker */}
        <label className="block text-gray-600 mb-2">New Return Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg mb-4"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        
        {/* Extend Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
          onClick={handleExtend}
        >
          Extend Issue Period
        </motion.button>
        
        {/* Message Display */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-gray-800"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default ExtendIssuePeriod;
