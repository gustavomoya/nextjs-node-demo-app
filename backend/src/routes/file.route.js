const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

const fileController = require("../controllers/file.controller");

router.post("/", auth, upload.single("file"), fileController.create);
router.get("/", auth, fileController.list);

module.exports = router;