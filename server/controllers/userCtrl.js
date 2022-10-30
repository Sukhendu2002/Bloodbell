const User = require("../models/userModel");

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
    const user = await User.create({
      userName,
      email,
      password,
      name,
      bloodGroup,
      contact,
      address,
      userType,
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
