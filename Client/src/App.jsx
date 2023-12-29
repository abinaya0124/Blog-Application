import React from "react";
import Home from "./Pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import PostDetails from "./Pages/PostDetails.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import Profile from "./Pages/Profile.jsx";
import EditPost from "./Pages/EditPost.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import MyBlogs from "./Pages/MyBlogs.jsx";

const App = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
};

export default App;
