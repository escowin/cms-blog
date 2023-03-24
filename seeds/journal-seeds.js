const { Journal } = require("../models");

const journalData = [
  {
    title: "Hot boy summer prep",
    start_date: "2023.03.01",
    end_date: "2023.06.12",
    duration: "16 weeks",
    description: "first journal",
    user_id: 1
  },
  {
    title: "2023 on-season",
    start_date: "2023.03.20",
    end_date: "2023.06.12",
    duration: "12 weeks",
    description: "first journal",
    user_id: 1
  },
  {
    title: "2023 spring lifts",
    start_date: "2023.03.20",
    end_date: "2023.06.12",
    duration: "12 weeks",
    description: "first journal",
    user_id: 1
  },
];

const seedJournals = () => Journal.bulkCreate(journalData);

module.exports = seedJournals;
