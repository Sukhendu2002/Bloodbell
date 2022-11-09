const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: 255,
  },
  dob: {
    type: Date,
    required: [true, "Please enter date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please enter blood group"],
  },
  adharno: {
    type: String,
    required: [true, "Please enter adhar number"],
    minlength: [12, "Adhar number must be at least 12 characters"],
    maxlength: 12,
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

  contact: {
    type: String,
    required: [true, "Please enter contact number"],
    minlength: [10, "Contact number must be at least 10 characters"],
  },

  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  state: {
    type: String,
    required: [true, "Please enter state"],
  },
  specificCity: {
    type: String,
  },
  lastDonated: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  donationCount: {
    type: Number,
    default: 0,
  },

  score: {
    type: Number,
    default: 0,
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

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
