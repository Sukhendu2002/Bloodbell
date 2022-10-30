import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
//React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../components/Loader";
import server from "../config/index";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const notify = (message, type) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${server}/api/auth/login`,
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", res.data.token);
      setLoggedIn(true);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      notify(err.response.data.message, "error");
    }
  };
  return (
    <>
      {loading ? (
        // <Loader />
        <div className="loader">
          <div className="loader__inner">Loading</div>
        </div>
      ) : (
        <div className="container">
          <h1>Login</h1>
          <form className="mt-5" onSubmit={loginHandler}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Login;
