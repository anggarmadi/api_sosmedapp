var express = require("express");
var router = express.Router();
const status = require("../controllers/status");


router.get("/", status.getallStatus);
router.get("/${id}", status.getStatusById);
router.post("/new", status.getStatusById);

module.exports = router;