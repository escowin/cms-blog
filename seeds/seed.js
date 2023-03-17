const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');

// loads environment variables from .env
dotenv.config();

// creates new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // use DB_NAME as the first argument
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
  },
);

// creates the database
// error:
// error creating database: ConnectionError [SequelizeConnectionError]: Unknown database 'fitness_logbook_db'
function sourceDatabase() {
  sequelize
    .query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}; CREATE DATABASE ${process.env.DB_NAME};`)
    .then(() => console.log(`created ${process.env.DB_NAME}.`))
    .catch((err) => console.error("error creating database:", err))
    .finally(() => sequelize.close());
}

sourceDatabase();