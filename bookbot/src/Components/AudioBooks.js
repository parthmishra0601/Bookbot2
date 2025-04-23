import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

const demoBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const AudioBooks = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/audiobooks")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAudiobooks(data);
        } else {
          setAudiobooks(demoBooks); // fallback to demo
        }
      })
      .catch(() => {
        setAudiobooks(demoBooks); // fallback to demo
      });
  }, []);

  const handlePlayPause = (audioSrc) => {
    if (currentAudio && currentAudio.src === audioSrc) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudio = new Audio(audioSrc);
      newAudio.play();
      setCurrentAudio(newAudio);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 py-12 px-6">
      <motion.div
        className="p-8 max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700">🎧 Audiobook Library</h2>
        <ul className="space-y-6">
          {audiobooks.map((book) => (
            <motion.li
              key={book.id}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-indigo-800">{book.title}</h3>
                <p className="text-gray-700">by {book.author}</p>
              </div>
              <motion.button
                onClick={() => handlePlayPause(book.audio_url)}
                className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying && currentAudio?.src === book.audio_url ? <FaPause /> : <FaPlay />}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AudioBooks;
