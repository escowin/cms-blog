const { User } = require("../models");

const userData = [
  {
    username: "user",
    password: "qwerty",
  },
  {
    username: "user2",
    password: "qwerty",
  },
  {
    username: "user3",
    password: "qwerty",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
