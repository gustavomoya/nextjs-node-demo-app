const User = require("../models/user");
const fileService = require("../services/file.service")

exports.create = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = await fileService.createFile({
            name: req.name,
            file: req.file,
            userId: req.user.id,
        });

        res.status(201).json({
            id: file.id,
            filename: file.filename,
            size: file.size,
        });

    } catch (err) {
        console.log(err);

        next(err);
    }
};

exports.list = async (req, res, next) => {

}