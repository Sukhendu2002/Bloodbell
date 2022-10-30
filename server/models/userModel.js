const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: 255,
    required: [true, "Please enter  userName"],
    unique: [true, "userName is already registered"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email is already registered"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: 255,
    select: false, //do not return password in response by default
  },
  name: {
    type: String,
    required: [true, "Please enter name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: 255,
  },
  bloodGroup: {
    type: String,
    required: [true, "Please enter blood group"],
  },
  contact: {
    type: String,
    required: [true, "Please enter contact number"],
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  userType: {
    type: String,
    required: [true, "Please enter user type"],
    enum: ["donor", "seeker"],
  },
  age: {
    type: Number,
    required: [true, "Please enter age"],
  },

  gender: {
    type: String,
    required: [true, "Please enter your gender"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  lastDonationDate: {
    type: Date,
    default: Date.now,
  },
});

//hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//generate a JWT and return it
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
