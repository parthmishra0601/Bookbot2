import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Authentication from "./Components/Authentication";
import Avatars from "./Components/Avatar";
import CreateAvatar from "./Components/CreateAvatar";
import AddBook from "./Components/AddBooks";
import AudioBooks from "./Components/AudioBooks";
import VideoBooks from "./Components/VideoBooks";
import CartPurchase from "./Components/CartPurchase";
import Chatbot from "./Components/Chatbot";
import Notifications from "./Components/Notifications";
import Sidebar from "./Components/Sidebar";
import DownloadBooks from "./Components/Download";
import BooksPage from "./Components/Books";
import SearchBooks from "./Components/Search";
import ExtendIssuePeriod from "./Components/ExtendIssue";

// A wrapper to use hooks like useLocation outside <Router>
const AppWrapper = () => {
  const location = useLocation();

  // Define the paths where Sidebar should NOT be shown
  const hideSidebarPaths = [ "/home", "/avatars", "/create-avatar"];

  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideSidebar && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/create-avatar" element={<CreateAvatar />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/audiobooks" element={<AudioBooks />} />
        <Route path="/videobooks" element={<VideoBooks />} />
        <Route path="/cart" element={<CartPurchase />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/download" element={<DownloadBooks />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/extend-issue" element={<ExtendIssuePeriod />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
