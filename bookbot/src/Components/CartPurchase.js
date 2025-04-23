import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import StripeCheckout from "react-stripe-checkout";

const CartPurchase = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch books from backend
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));

    // Fetch cart data from backend
    fetch("http://localhost:5000/api/cart") // Fetch cart items
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (book) => {
    // Add item to cart (POST request to backend)
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book, quantity: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data)) // Update cart with response from backend
      .catch((err) => console.error(err));
  };

  const removeFromCart = (bookId) => {
    // Remove item from cart (DELETE request to backend)
    fetch(`http://localhost:5000/api/cart/${bookId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setCart(data)) // Update cart with response from backend
      .catch((err) => console.error(err));
  };

  const handleToken = (token) => {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, cart }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error(err));

    setCart([]); // Clear cart after purchase
  };

  return (
    <div className="flex bg-gradient-to-br from-purple-400 to-pink-500 min-h-screen">
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
          <h2 className="text-4xl font-bold text-white text-center">
            🛒 Cart & Purchase
          </h2>
        </motion.div>

        {/* Available Books */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white">📚 Available Books</h3>
          <motion.ul className="mt-4 space-y-4">
            {books.map((book) => (
              <motion.li
                key={book.id}
                className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow flex justify-between items-center hover:shadow-lg transition transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <h4 className="text-lg font-semibold text-white">{book.title}</h4>
                  <p className="text-gray-200">by {book.author}</p>
                  <p className="text-yellow-300 font-bold">${book.price}</p>
                </div>
                <motion.button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => addToCart(book)}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Cart Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white">🛍 Your Cart</h3>
          <motion.ul className="mt-4 space-y-4">
            {cart.map((item, index) => (
              <motion.li
                key={index}
                className="p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-200">Quantity: {item.quantity}</p>
                  <p className="text-yellow-300 font-bold">${item.price}</p>
                </div>
                <motion.button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={() => removeFromCart(item.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* QR Code for Payment */}
        {cart.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCodeCanvas value="https://payment-gateway.com/checkout" size={128} />
            </div>
          </div>
        )}

        {/* Stripe Checkout Button */}
        {cart.length > 0 && (
          <div className="flex justify-center mt-6">
            <StripeCheckout
              stripeKey="your_stripe_public_key"
              token={handleToken}
              amount={cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
              name="Book Store Purchase"
              currency="USD"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPurchase;
