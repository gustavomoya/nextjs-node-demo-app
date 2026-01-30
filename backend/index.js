const express = require('express')
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const app = express()

app.use(cors());
// app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", require("./src/routes"));
app.use((err, req, res, next) => {
    console.error('error');
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
})

module.exports = app;

//curl -d '{"recipient":["gustavo.moya@geniusreferrals.com"], "subject": "News about backlinks", "body": "BAcklink Feedback"}' -H "Content-Type: application/json" -X POST http://localhost:3001/gmail/messages