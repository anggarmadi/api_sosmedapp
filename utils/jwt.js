var jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
  return jsonWebToken.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
    }
  );
};

const generateRefreshToken = (user) => {
  return jsonWebToken.sign(
    {
      id: user.id,
      role: user.role, // Add role to the JWT payload
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "86400s",
    }
  );
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET);
    return {
      id: decoded.id,
    };
  } catch (error) {
    return null;
  }
};

const parseJWT = (token) => {
  try {
    const decoded = jsonWebToken.decode(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJWT,
  verifyAccessToken,
};
