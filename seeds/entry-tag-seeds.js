const { EntryTag } = require("../models");

const entryTagData = [
  {
    entry_id: 1,
    tag_id: 1,
  },
  {
    entry_id: 1,
    tag_id: 2,
  },
  {
    entry_id: 3,
    tag_id: 3,
  },
  {
    entry_id: 2,
    tag_id: 4,
  },
  {
    entry_id: 8,
    tag_id: 6,
  },
];

const seedEntryTags = () => EntryTag.bulkCreate(entryTagData);

module.exports = seedEntryTags;
