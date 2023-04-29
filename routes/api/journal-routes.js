const router = require("express").Router();
const withAuth = require("../../utils/auth"); // use after modularization
const {
  getAllJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} = require("../../controllers/journal-controllers");

// authguard middleware | routes below are accesible only to logged in users
router.use(withAuth);

// authguarded api endpoints
router.route("/").get(getAllJournals).post(createJournal);
router.route("/:id").get(getJournalById).put(updateJournal).delete(deleteJournal);

module.exports = router;
