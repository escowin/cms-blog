const { Tag } = require("../models");

const tagData = [
  {
    // add fields
  },
  {
    // add fields
  },
  {
    // add fields
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
