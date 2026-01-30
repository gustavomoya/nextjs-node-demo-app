const File = require("../models/file");

exports.listFilesByUser = async (userId) => {
    return File.findAll({
        where: { user_id: userId },
        attributes: ["id", "filename", "original_name", "size", "created_at"],
        order: [["created_at", "DESC"]],
    });
};

exports.getFile = async ({ id, userId }) => {
    const file = await File.findOne({
        where: { id, user_id: userId },
    });

    if (!file) {
        throw new Error("File not found");
    }

    return file;
};

exports.getFileById = async (id) => {
    const file = await File.findByPk(id);

    if (!file) {
        throw new Error("File not found");
    }

    return file;
};

exports.createFile = async ({ userId, filename, file }) => {
    return File.create({
        filename: filename,
        original_name: file.originalname,
        size: file.buffer.length,
        content: file.buffer,
        user_id: userId,
    });
};

exports.updateFile = async ({ id, filename, file, userId }) => {
    const record = await File.findOne({
        where: { id, user_id: userId },
    });

    if (!record) {
        throw new Error("File not found");
    }

    if (filename) {
        record.filename = filename;
    }

    if (file) {
        record.original_name = file.originalname;
        record.content = file.buffer;
        record.size = file.buffer.length;
    }

    await record.save();

    return record;
};


exports.remove = async ({ id, userId }) => {
    const record = await File.findOne({
        where: { id, user_id: userId },
    });


    if (!record) {
        throw new Error("File not found");
    }

    await record.destroy();

    return record;
};