const { Queue, QueueEvents} = require("bullmq");
const redis = require("../config/redis");

const fileQueue = new Queue("file-processing-queue", {
    connection: redis,
});

const queueEvents = new QueueEvents('file-processing-queue');

queueEvents.on('completed', ({ jobId }) => {
    console.log('File compression task completed');
});

module.exports = fileQueue;