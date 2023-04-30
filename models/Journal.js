const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Journal extends Model {}

// defines fields & meta data configuration. user & post have a 1:M relationship.
Journal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 75],
      },
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 10],
        is: /^\d{4}-\d{2}-\d{2}$/i,
      }
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 10],
        is: /^\d{4}-\d{2}-\d{2}$/i,
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 52,
        min: 1,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "journal",
  }
);
module.exports = Journal;
