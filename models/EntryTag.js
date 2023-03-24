const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class EntryTag extends Model {}

EntryTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entry_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'entry',
        key: 'id',
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      }
    }  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'entry_tag',
  }
);

module.exports = EntryTag;
