const { user } = require("../models");
// const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../utils/jwt");

const loginPost = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  try {
    //Mengecek atau mencari user berdasarkan username
    const userExists = await user.findOne({
      where: {
        username: username,
      },
    });

    //Jika username tidak ditemukan
    if (!userExists) {
      return res.status(401).json({
        msg: "Username not valid",
      });
    }
    console.log(`user id = ${userExists.id}`);
    //Mengecek password
    const match = await bcrypt.compare(
      password,
      userExists.password,
      async (err, result) => {
        if (err || !result) {
          return res.status(401).json({
            msg: "Password wrong",
          });
        }

        //Akses Token jika berhasil login
        // const accessToken = jwt.sign(
        //   {
        //     user_id: user.id,
        //   },
        //   process.env.ACCESS_TOKEN_SECRET,
        //   {
        //     expiresIn: "1000s",
        //   }
        // );
        const usr = {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
        };
        const token = generateAccessToken(usr);
        const refreshToken = generateRefreshToken(usr);

        // req.session.user_id = user.id;

        return res.status(200).json({
          errors: [],
          message: "Login successfully",
          data: usr,
          accessToken: token,
          refreshToken: refreshToken,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Failed Login",
      r: error,
    });
  }
};

const signupPost = async (req, res) => {
  const { username, email, name, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const usernameExist = await user.findOne({
    where: { username: req.body.username },
  });
  if (usernameExist) return res.status(400).send("username telah digunakan");

  try {
    await user.create({
      username: username,
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(200).json({
      errors: [],
      message: "Sign Up successfully",
      data: {
        username: username,
        name: name,
        email: email,
        password: hashPassword,
      },
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = { loginPost, signupPost };
