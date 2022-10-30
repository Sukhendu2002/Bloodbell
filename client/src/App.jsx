import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
const App = () => {
  //check if the authToken is available in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = localStorage.getItem("authToken");
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);

  const setLoggedIn = (state) => {
    setIsLoggedIn(state);
    console.log("logged in");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/myblogs" element={<MyWritenBlogs />} />
            <Route path="/edit/:id" element={<EditBlog />} /> */}
          </Route>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blogs" element={<Blogs />} /> */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/register"
            element={<Register setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
