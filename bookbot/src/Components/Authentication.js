import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, signInWithGoogle, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected, redirecting to home...");
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let success;
      if (isLogin) {
        success = await loginUser(email, password);
      } else {
        success = await registerUser(email, password);
      }

      if (success) {
        console.log("Authentication Successful, Redirecting...");
        navigate("/home"); // Redirect after login/signup
      } else {
        console.error("Login/Signup failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <>
      {/* Background Container */}
      <div className="fixed inset-0 w-screen h-screen">
        <img src="/Bgimage5.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Authentication Form */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-40 backdrop-blur-md p-8 rounded-lg shadow-2xl w-[90%] max-w-md">
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="text-white block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="text-white block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-white block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-300">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <button
            onClick={async () => {
              try {
                const success = await signInWithGoogle();
                if (success) {
                  console.log("Google Sign-In Successful, Redirecting...");
                  navigate("/home");
                }
              } catch (error) {
                console.error("Google Sign-In error:", error.message);
              }
            }}
            className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300"
          >
            Sign in with Google
          </button>

          <div className="text-center mt-4">
            <p className="text-white text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:text-blue-300 underline focus:outline-none">
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
