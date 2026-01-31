const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const File = sequelize.define(
    "File",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        original_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.BLOB("long"),
            allowNull: false,
        },
        zip_content: {
            type: DataTypes.BLOB("long"),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "processing",
        },
    },
    {
        tableName: "files",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

User.hasMany(File, { foreignKey: "user_id" });
File.belongsTo(User, { foreignKey: "user_id" });

module.exports = File;