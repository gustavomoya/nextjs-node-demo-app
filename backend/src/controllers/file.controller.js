const fileService = require("../services/file.service")
const {remove} = require("../services/file.service");
const mime = require("mime-types");
const path = require("path");

exports.list = async (req, res, next) => {
    try {
        const files = await fileService.listFilesByUser(req.user.id);

        res.status(200).json(files);
    } catch (err) {
        console.log(err);

        return res.status(500).json(false);
    }
}

exports.getFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const file = await fileService.getFile({id, userId: req.user.id});

        res.status(200).json(file);
    } catch (err) {
        console.log(err);

        return res.status(500).json(false);
    }
}

exports.create = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = await fileService.createFile({
            userId: req.user.id,
            filename: name,
            file: req.file,
        });

        res.status(201).json({
            id: file.id,
            filename: file.filename,
            size: file.size,
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json(false);
    }
};


exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const file = await fileService.updateFile({
            id,
            filename: name,
            file: req.file,
            userId: req.user.id,
        });

        res.json({
            id: file.id,
            filename: file.filename,
            size: file.size,
        });
    } catch (err) {
        return res.status(500).json(false);
    }
};

exports.download = async (req, res, next) => {
    try {
        const { id } = req.params;

        const file = await fileService.getFileById(id);

        const extension = path.extname(file.original_name);
        const filename = `${file.filename}${extension}`;

        const mimeType =
            mime.lookup(extension) || "application/octet-stream";

        res.setHeader("Content-Type", mimeType);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        res.send(file.content);
    } catch (err) {
        next(err);
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const {id} = req.params;

        const removed = await remove({id, userId: req.user.id});

        if (!removed) {
            return res.status(404).json({message: "File not found"});
        }

        res.status(204).send();
    } catch (err) {
        return res.status(500).json(false);
    }
};