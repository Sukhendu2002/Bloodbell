import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.css";
const Header = ({ isLoggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setLogin(true);
  //   }
  // }, []);

  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{
        height: "80px",
        zIndex: "100",
      }}
    >
      <div className="container-fluid container">
        <Link
          to="/"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "30px",
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
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="searchbloodbanks"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2069/2069788.png"
                  alt="car"
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  Nearest Blood Bank
                </span>
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
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
