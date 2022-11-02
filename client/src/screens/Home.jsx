import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid container">
      <div className="row">
        <div
          className="col-md-6 "
          style={{
            paddingTop: "5rem",
          }}
        >
          <h1 className="display-1">BloodBell</h1>
          <h3 className="display-4">Donate Blood, Save Lives</h3>
          <p className="lead">
            BloodBell is a platform to connect blood donors and blood
            recipients.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              className="btn btn-primary btn-lg px-4 me-md-2"
              type="button"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn btn-outline-secondary btn-lg px-4"
              type="button"
              to="/register"
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="./images/hero.jpg"
            alt="blood"
            className="img-fluid"
            style={{
              height: "90%",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
