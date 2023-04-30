const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Entry extends Model {}

Entry.init(
  {
    // defined fields
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    entry_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 10],
        is: /^\d{4}-\d{2}-\d{2}$/i,
      }
    },
    entry_weight: {
      type: DataTypes.DECIMAL(4,1),
      allowNull: false,
    },
    entry_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
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
