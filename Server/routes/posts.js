const express = require("express");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(200).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(200).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(":/id", async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const AllPosts = await Post.find();
    res.status(200).json(AllPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

