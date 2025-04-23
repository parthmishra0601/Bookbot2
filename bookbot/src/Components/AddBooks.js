import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const demoBooks = [
  {
    title: "To Kill a Mockingbird",
    genre: "Classic Fiction",
    type: "Fiction",
    ageGroup: "13+",
    authorName: "Harper Lee",
    authorDetails:
      "Harper Lee was an American novelist best known for her 1960 novel about racial injustice in the Deep South.",
  },
  {
    title: "Sapiens",
    genre: "History / Anthropology",
    type: "Non-Fiction",
    ageGroup: "16+",
    authorName: "Yuval Noah Harari",
    authorDetails:
      "Yuval Harari is an Israeli historian and author, known for his deep insights on human evolution and culture.",
  },
  {
    title: "The Hobbit",
    genre: "Fantasy",
    type: "Fiction",
    ageGroup: "10+",
    authorName: "J.R.R. Tolkien",
    authorDetails:
      "J.R.R. Tolkien was a British writer and professor, famous for his fantasy novels including The Hobbit and The Lord of the Rings.",
  },
];

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    genre: "",
    type: "",
    ageGroup: "",
    authorName: "",
    authorDetails: "",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (!storedBooks || storedBooks.length === 0) {
      localStorage.setItem("books", JSON.stringify(demoBooks));
      setBooks(demoBooks);
    } else {
      setBooks(storedBooks);
    }
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    alert("📘 Book successfully added!");
    setBook({
      title: "",
      genre: "",
      type: "",
      ageGroup: "",
      authorName: "",
      authorDetails: "",
    });
    navigate("/books");
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          📖 Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Book Title",
              name: "title",
              type: "text",
              placeholder: "Enter book title",
            },
            {
              label: "Genre",
              name: "genre",
              type: "text",
              placeholder: "e.g., Mystery, Sci-Fi",
            },
            {
              label: "Type",
              name: "type",
              type: "text",
              placeholder: "Fiction / Non-Fiction",
            },
            {
              label: "Age Group",
              name: "ageGroup",
              type: "text",
              placeholder: "e.g., 12+, 16+",
            },
            {
              label: "Author Name",
              name: "authorName",
              type: "text",
              placeholder: "Author's full name",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-sm font-semibold text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={book[name]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Author Details</label>
            <textarea
              name="authorDetails"
              placeholder="Enter details about the author"
              value={book.authorDetails}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24"
              required
            ></textarea>
          </div>

          <div className="flex justify-between pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200"
            >
              📚 Add Book
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setBook({
                  title: "",
                  genre: "",
                  type: "",
                  ageGroup: "",
                  authorName: "",
                  authorDetails: "",
                })
              }
              className="w-1/2 ml-3 bg-gray-300 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-400 transition duration-200"
            >
              🔄 Clear
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddBook;
