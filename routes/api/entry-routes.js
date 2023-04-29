const router = require("express").Router()
const withAuth = require("../../utils/auth");
const { getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry } = require("../../controllers/api/entry-controllers");

// api endpoints
router.route("/").get(getAllEntries).post(createEntry);

router.route("/:id").get(getEntryById).put(updateEntry).delete(deleteEntry);

module.exports = router;