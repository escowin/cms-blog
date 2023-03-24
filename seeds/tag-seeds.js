const { Tag } = require("../models");

const tagData = [
  {
    tag_name: "meal prep"
  },
  {
    tag_name: "rowing"
  },
  {
    tag_name: "erg"
  },
  {
    tag_name: "weightlifting"
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
