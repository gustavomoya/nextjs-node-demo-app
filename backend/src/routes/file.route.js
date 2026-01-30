const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

const fileController = require("../controllers/file.controller");

router.post("/", auth, upload.single("file"), fileController.create);
router.get("/", auth, fileController.list);
router.get("/:id", auth, fileController.getFile);
router.put("/:id", auth, upload.single("file"), fileController.update);
router.get("/:id/download", fileController.download);
router.delete("/:id", auth, fileController.deleteFile);

module.exports = router;