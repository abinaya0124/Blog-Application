const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("You are not authenticated to proceed further");
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid here!");
    }
    req.userId = data._id;
    // console.log("deleted");
    next();
  });
};

module.exports = verifyToken;
