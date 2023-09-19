// npm dependencies | orm &
const Sequelize = require("sequelize");

require("dotenv").config();

let sequelize;
// heroku & local deployment, latter relies on local .env
if (process.env.PORT) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.PROD_HOST,
      dialect: process.env.PROD_DIALECT,
      port: process.env.PROD_PORT,
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
