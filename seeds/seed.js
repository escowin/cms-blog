const seedUsers = require('./user-seeds');
const seedJournals = require('./journal-seeds');
const seedEntries = require('./entry-seeds');
const seedTags = require('./tag-seeds');

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");
  
  await seedJournals();
  console.log("\n----- JOURNALS SEEDED -----\n");
  
  await seedEntries();
  console.log("\n----- ENTRIES SEEDED -----\n");
  
  await seedTags();
  console.log("\n----- TAGS SEEDED -----\n");

  process.exit(0);
};

seedAll();
