import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWTtVvp98C0Ukhtp--SAzOQfSbmdCgRyo",
  authDomain: "bookbot-updated.firebaseapp.com",
  projectId: "bookbot-updated",
  storageBucket: "bookbot-updated.appspot.com",  // Fixed incorrect URL
  messagingSenderId: "586622070212",
  appId: "1:586622070212:web:6c3102f74f62a3c67bc891",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// **Register User**
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return null;
  }
};

// **Login User**
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    return null;
  }
};

// **Logout User**
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    return true;
  } catch (error) {
    console.error("Error signing out:", error.message);
    return false;
  }
};

// **Google Sign-In**
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    return null;
  }
};
