const { Entry } = require("../models");

const entryData = [
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

const seedEntries = () => Entry.bulkCreate(entryData);

module.exports = seedEntries;
