const Post = require("../models/postModel");

exports.createPost = async (req, res, next) => {
  const { title, description, bloodGroup, contact, address, user } = req.body;
  try {
    const post = await Post.create({
      title,
      description,
      bloodGroup,
      contact,
      address,
      user,
    });
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
