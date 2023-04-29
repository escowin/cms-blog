const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { homepageView, loginView, journalView, editJournalView, editEntryView, profileView } = require("../../controllers/html-controllers");

// html endpoints
router.route("/").get(homepageView);
router.route("/login").get(loginView);
router.route("/journals/:id").get(withAuth, journalView);
router.route("/journals/edit/:id").get(withAuth, editJournalView);
router.route("/entries/edit/:id").get(withAuth, editEntryView);
router.route("/profile").get(withAuth, profileView);

module.exports = router;