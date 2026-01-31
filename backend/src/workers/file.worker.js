const { Worker} = require("bullmq");
const redis = require("../config/redis");
const fileService = require("../services/file.service")
const AdmZip = require("adm-zip");
const path = require("path");


module.exports.startFileWorker = () => {
    new Worker(
        "file-processing-queue",
        async (job) => {
            const { fileId } = job.data;

            const file = await fileService.getFileById(fileId);
            if (!file) return;

            try {
                console.log(`start to compress file with id ${fileId}`);

                const zip = new AdmZip();
                const extension = path.extname(file.original_name);
                const filename = `${file.filename}${extension}`;

                zip.addFile(filename, Buffer.from(file.content));

                file.zip_content = zip.toBuffer();
                file.status = "completed";

                await file.save();
            } catch (e) {
                console.log(e)
            }

        },
        { connection: redis }
    );

    console.log("File worker started");
};