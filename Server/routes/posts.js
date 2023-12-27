const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const verifyToken = require("../verifyToken.jsx");

router.post('/create',verifyToken, async(req, res)=>{
  try {
    const newPost=new Post(req.body)
    const savePost=await newPost.save()
    res.status(200).json(savePost)
  } catch (error) {
    res.status(200).json(error)
  }
})
//update
router.put("/:id",verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/:id",verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({postId:req.params.id})
    res.status(200).json("Post has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const query=req.query
  // console.log(req.query)
try {
  const searchFilter={
      title:{$regex:query.search, $options:"i"}
  }
  const AllPosts = await Post.find(query.search?searchFilter:null);
  res.status(200).json(AllPosts);
} catch (error) {
  res.status(500).json(error);
}
});

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({userId:req.params.userId});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
