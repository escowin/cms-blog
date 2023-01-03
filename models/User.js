const bcrypt = require('bcrypt'); // hashes passwords
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        // this | accesses user's stored hashed string pw
        return bcrypt.compareSync(loginPw, this.password)
    }
};

User.init(
    {
        // defined User table columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    },
    {
        // hashes password before user creation | hook is placed in second User.init object
        hooks: {
            // async - await
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // hashes an updated password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // table configuration
        sequelize, // passes the imported orm connection
        timestamps: false, // prevents auto createdAt/updatedAt timestamp fields
        freezeTableName: true, // table name remains singular
        underscored: true, // snake_case
        modelName: 'user'
    }
)

module.exports = User;