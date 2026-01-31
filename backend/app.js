const express = require('express')
const cors = require("cors");

const { startFileWorker } = require("./src/workers/file.worker");

const app = express()

app.use(cors());

app.use(express.json());

app.use("/api/v1", require("./src/routes"));

app.use((err, req, res, next) => {
    console.error('error');
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
})

startFileWorker();

module.exports = app;
