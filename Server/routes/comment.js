const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken.jsx");

router.post("/create",verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id",verifyToken, async (req, res) => {
  try {
    const updated=await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete("/:id",verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json("Comment has been deleted succesfully")
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get("/post/:postId", async (req, res) => {
  try {
    const getUserComment=await Comment.find({postId:req.params.postId})
    res.status(200).json(getUserComment)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports=router
