var express = require("express");
var router = express.Router();
const controllers = require("../controller/auth");
const { verifyToken } = require("../middleware/verifyToken");

/* GET users listing. */
router.get("/login", function (req, res) {
  res.send("Log in Brow");
});
router.post("/login", controllers.loginPost);

router.get("/register", function (req, res) {
  res.send("Sign Up Brow");
});
router.post("/register", controllers.signupPost);

module.exports = router;
