const { Journal } = require("../models");

const journalData = [
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

const seedJournals = () => Journal.bulkCreate(journalData);

module.exports = seedJournals;
