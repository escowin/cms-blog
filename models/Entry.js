const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Entry extends Model {}

Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    entry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
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
