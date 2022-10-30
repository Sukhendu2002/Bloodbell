import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.css";
const Header = ({ isLoggedIn, setLoggedIn }) => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLogin(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container-fluid container">
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginRight: "10px",
          }}
        >
          BloodBell
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/dashboard"
              >
                Add Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/myblogs"
              >
                My Blogs
              </Link>
            </li> */}
          </ul>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/");
                // setLogin(false);
                setLoggedIn(false);
              }}
              to="/login"
              className="btn btn-dark button"
              style={{
                marginRight: "10px",
              }}
            >
              Logout
            </button>
          ) : (
            <div className="buttons">
              <Link
                to="/login"
                className="btn btn-dark button"
                style={{
                  marginRight: "10px",
                }}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-dark button">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
