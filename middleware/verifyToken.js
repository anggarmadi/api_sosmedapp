const { verifyAccessToken } = require("../utils/jwt");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errors: ["Access token not found"],
      message: "Access Failed",
      data: null,
    });
  }
  const verify = verifyAccessToken(token);
  if (!verify) {
    return res.status(401).json({
      errors: ["Invalid access token"],
      message: "Access Failed",
      data: null,
    });
  }
  console.log(token);
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    // Token tidak valid atau kedaluwarsa, redirect ke halaman login
    console.log(error);
    return res.send(error);
  }
};

module.exports = { verifyToken };
