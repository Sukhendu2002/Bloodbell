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
  user: {
    type: String,
  },
});

const Post = mongoose.model("Post", postModel);
module.exports = Post;
