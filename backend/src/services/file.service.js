const File = require("../models/file");

exports.createFile = async ({ userId, name, file }) => {
    return File.create({
        filename: name,
        size: file.buffer.length,
        content: file.buffer,
        user_id: userId,
    });
};

exports.listFilesByUser = async (userId) => {
    return File.findAll({
        where: { user_id: userId },
        attributes: ["id", "filename", "size", "created_at"],
        order: [["created_at", "DESC"]],
    });
};