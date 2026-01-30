const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/files", require("./file.route"));

module.exports = router;