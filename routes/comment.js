var express = require("express");
var router = express.Router();
const comment = require("../controllers/comment");


router.get("/", comment.getAllComment);
router.get("/${id}", comment.getCommentById);

module.exports = router;