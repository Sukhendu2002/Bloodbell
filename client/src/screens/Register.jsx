import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import server from "../config/index";

const Register = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const getLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

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

  const registerHandler = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !userName ||
      !name ||
      !bloodGroup ||
      !contact ||
      !address ||
      !userType ||
      !age ||
      !gender
    ) {
      notify("Please enter all fields", "error");
      return;
    }

    setLoading(true);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server}/api/auth/signup`,
        {
          userName,
          email,
          password,
          name,
          bloodGroup,
          contact,
          address,
          userType,
          age,
          gender,
        },
        config
      );
      localStorage.setItem("authToken", res.data.token);
      setLoggedIn(true);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      notify(err.response.data.error, "error");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        // <Loader />
        <div className="loader">
          <div className="loader__inner">Loading</div>
        </div>
      ) : (
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                      Registration Form
                    </h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="name"
                              className="form-control form-control-md"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label className="form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control form-control-md"
                              onChange={(e) => setUserName(e.target.value)}
                            />
                            <label className="form-label">
                              Username <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <input
                              type="number"
                              className="form-control form-control-md"
                              id="age"
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <label className="form-label">
                              Age <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">
                            Gender: <span className="text-danger">*</span>
                          </h6>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="femaleGender"
                              value="female"
                              // checked
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Female</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="maleGender"
                              value="male"
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Male</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="otherGender"
                              value="other"
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label">Other</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="emailAddress"
                              className="form-control form-control-md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="number"
                              id="phoneNumber"
                              className="form-control form-control-md"
                              onChange={(e) => setContact(e.target.value)}
                            />
                            <label className="form-label">
                              Phone Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label className="form-label select-label">
                            Blood Group: <span className="text-danger">*</span>
                          </label>
                          <select
                            className="select form-control-md  
                            rounded-3
                            mx-2
                          "
                            onChange={(e) => setBloodGroup(e.target.value)}
                          >
                            <option value="1">Select Blood Group</option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <label className="form-label select-label">
                            User Type: <span className="text-danger">* </span>
                          </label>
                          <select
                            className="select form-control-md  rounded-3
                            mx-2"
                            onChange={(e) => setUserType(e.target.value)}
                          >
                            <option value="1">Select User Type</option>

                            <option value="donor">Donor</option>
                            <option value="seeker">Seeker</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label className="form-label select-label">
                            Address: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="form-control form-control-md"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>

                        <div className="col-6">
                          <label className="form-label select-label">
                            Password: <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-md"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                          onClick={registerHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default Register;
