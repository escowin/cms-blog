const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { tag_name_regex } = require("../utils/helpers");

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
        regex: (value) => tag_name_regex(value)
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
