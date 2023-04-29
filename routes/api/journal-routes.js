const router = require("express").Router();
const withAuth = require("../../utils/auth"); // use after modularization
const {
  getAllJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} = require("../../controllers/api/journal-controllers");

// api endpoints
router.route("/").get(getAllJournals).post(createJournal);

router
  .route("/:id")
  .get(getJournalById)
  .put(updateJournal)
  .delete(deleteJournal);

module.exports = router;
