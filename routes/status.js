var express = require("express");
var router = express.Router();
const status = require("../controllers/status");
const multer = require('multer');
const app = express();


const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images"); // Simpan gambar di folder 'images'
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname); // Nama file akan menjadi timestamp + nama asli file
    },
  });
  
const fileFilter = function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload = multer({ storage: fileStorage });

router.get("/", status.getallStatus);
router.get("/:id", status.getStatusById);
router.post("/new",upload.single('foto'), status.addStatus);
router.delete("/:id", status.deleteStatus);

module.exports = router;