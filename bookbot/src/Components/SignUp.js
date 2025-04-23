import React from 'react';

const SignUp = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      
      <img 
        src="Bgimage5.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-white text-4xl font-semibold text-center mb-8">Sign Up</h2>

        <form>
          
          <div className="mb-6">
            <label className="text-white block text-lg font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-5 py-3 rounded-md bg-white bg-opacity-40 text-black placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

        
          <div className="mb-6">
            <label className="text-white block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-md bg-white bg-opacity-40 text-black placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          
          <div className="mb-6">
            <label className="text-white block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-md bg-white bg-opacity-40 text-black placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

      
          <div className="mb-6">
            <label className="text-white block text-lg font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-5 py-3 rounded-md bg-white bg-opacity-40 text-black placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-300 text-lg"
          >
            Sign Up
          </button>
        </form>

      
        <div className="text-center mt-6">
          <p className="text-white text-lg">
            Already have an account? <a href="#" className="text-blue-400 underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;