const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const {
    name,
    userName,
    email,
    password,
    bloodGroup,
    contact,
    address,
    userType,
    age,
    gender,
  } = req.body;
  try {
    const isalready = await User.findOne({ email });
    if (isalready) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const isalreadyUserName = await User.findOne({ userName });
    if (isalreadyUserName) {
      return res.status(400).json({
        error: "UserName already exists",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }
    //check for contact number
    // if (contact.length < 11) {
    //   return res.status(400).json({
    //     error: "Contact number must contain 10 characters",
    //   });
    // }
    //check for age
    if (age < 18) {
      return res.status(400).json({
        error: "Age must be greater than 18",
      });
    }
    if (age < 18 && userType == "donor") {
      return res.status(400).json({
        error: "Age must be greater than 18 to be a donor",
      });
    }
    const user = await User.create({
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
    });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({
      error: "Error signing up user",
      err: err.message,
    });
  }
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      message: "Error logging in user",
      error: err,
    });
  }
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const userObj = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userObj,
  });
};

//check if the token is still valid
exports.validStatus = async (req, res, next) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error logging in user",
      error: err,
    });
  }
};
