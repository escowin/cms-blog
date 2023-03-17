const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Entry extends Model {}

Entry.init(
  {
    // defined fields | id, entry_text, user_id, journal_id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    entry_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    journal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "journal",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "entry",
  }
);

module.exports = Entry;
