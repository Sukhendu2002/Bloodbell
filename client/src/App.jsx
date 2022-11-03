import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import server from "./config/index";
const App = () => {
  //check if the authToken is available in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loggedIn = localStorage.getItem("authToken");

  const loadUser = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server}/api/auth/validStatus`,
        {
          token: loggedIn,
        },
        config
      );
      console.log(res.data);
      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("user", user);
      }
    } catch (err) {
      setLoading(false);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    setLoading(true);
    if (loggedIn) {
      loadUser();
    }
    setLoading(false);
  }, [loggedIn]);

  const setLoggedIn = (state) => {
    setIsLoggedIn(state);
    console.log("logged in");
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
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
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Register setLoggedIn={setLoggedIn} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
