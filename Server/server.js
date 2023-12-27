const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const postRoute = require("./routes/posts.js");
const commentRoute = require("./routes/comment.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: false }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successfull");
  } catch (err) {
    console.log(err);
  }
};

dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(process.env.PORT);
});
