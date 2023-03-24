const { Tag } = require("../models");

const tagData = [
  {
    tag_name: "back-day"
  },
  {
    tag_name: "rowing"
  },
  {
    tag_name: "erg"
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
