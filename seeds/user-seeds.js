const { User } = require("../models");
const bcrypt = require("bcrypt")

const userData = [
  {
    username: "user",
    password: bcrypt.hashSync("qwerty", 10),
  },
  {
    username: "user2",
    password: bcrypt.hashSync("qwerty", 10),
  },
  {
    username: "user3",
    password: bcrypt.hashSync("qwerty", 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
