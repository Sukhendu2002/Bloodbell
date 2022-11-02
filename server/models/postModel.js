const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: 255,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
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
});

module.exports = mongoose.model("Post", postModel);
