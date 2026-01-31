const File = require("../models/file");

/**
 * Get the list of file by user
 *
 * @param userId the user id
 *
 * @returns {Promise<Model<any, TModelAttributes>[]>}
 */
exports.listFilesByUser = async (userId) => {
    return File.findAll({
        where: { user_id: userId },
        attributes: ["id", "filename", "original_name", "size", "created_at"],
        order: [["created_at", "DESC"]],
    });
};

/**
 * Get a file
 *
 * @param id     the file id
 * @param userId the user id
 * @returns {Promise<*>}
 */
exports.getFile = async ({ id, userId }) => {
    const file = await File.findOne({
        where: { id, user_id: userId },
    });

    if (!file) {
        throw new Error("File not found");
    }

    return file;
};

/**
 * Get a file by the given file id
 *
 * @param id the file id
 *
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
exports.getFileById = async (id) => {
    const file = await File.findByPk(id);

    if (!file) {
        throw new Error("File not found");
    }

    return file;
};

/**
 * Create a file
 *
 * @param userId   the user id
 * @param filename the filename
 * @param file     the file object
 *
 * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
 */
exports.createFile = async ({ userId, filename, file }) => {
    return File.create({
        filename: filename,
        original_name: file.originalname,
        size: file.buffer.length,
        content: file.buffer,
        user_id: userId,
    });
};

/**
 * Update a file
 *
 * @param id       the file id
 * @param filename the filename
 * @param file     the file object
 * @param userId   the user id
 *
 * @returns {Promise<*>}
 */
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

/**
 * Remove a file
 *
 * @param id     the file id
 * @param userId the user id
 *
 * @returns {Promise<*>}
 */
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