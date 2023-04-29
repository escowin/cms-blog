const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("../../controllers/entry-controllers");

// authguard middleware | routes below are accesible only to logged in users
router.use(withAuth);

// authguarded api endpoints
router.route("/").get(getAllEntries).post(createEntry);
router.route("/:id").get(getEntryById).put(updateEntry).delete(deleteEntry);

module.exports = router;
