var express = require("express");
var router = express.Router();
const comment = require("../controllers/comment");


router.get("/", comment.getAllComment);
router.get("/:id", comment.getCommentById);
router.post("/new/:status_id", comment.addComment);
router.delete("/:id", comment.deleteComment);

module.exports = router;