const { Redis } = require("ioredis");

const redis = new Redis({
    host: process.env.REDIS_DB_HOST,
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD,
    // username: process.env.REDIS_USER,
    // tls: process.env.ENV === "production",
    maxRetriesPerRequest: null
});

module.exports = redis;